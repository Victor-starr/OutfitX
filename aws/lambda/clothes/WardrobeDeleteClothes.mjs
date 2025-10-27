import {
  DynamoDBClient,
  GetItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// AWS Clients
const region = process.env.AWS_MY_REGION; // S3 and DynamoDB
const dynamo = new DynamoDBClient({ region });
const s3 = new S3Client({ region });

// Named resources
const BUCKET_NAME = process.env.WARDROBE_S3_BUCKET_NAME;
const TABLE_NAME = process.env.WARDROBE_TABLE_NAME;

export const handler = async (event) => {
  try {
    // Parse input
    const { itemId } = JSON.parse(event.body);
    // Get user ID from authorizer
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    // Prepare to get item from DynamoDB
    const payload = {
      TableName: TABLE_NAME,
      Key: {
        userId: { S: userId },
        itemId: { S: itemId },
      },
    };
    // DynamoDB GetItem to fetch the pointed item
    const data = await dynamo.send(new GetItemCommand(payload));

    // If item not found, return 404
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item not found" }),
      };
    }
    // Unmarshall AKA convert DynamoDB format to normal JSON
    const item = unmarshall(data.Item);

    // Delete image from S3
    if (item.s3Key) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: item.s3Key,
        })
      );
      console.log(`Deleted image from S3: ${item.s3Key}`);
    } else {
      console.warn("No s3Key found for item, skipping S3 delete.");
    }

    // Delete from DynamoDB
    await dynamo.send(new DeleteItemCommand(payload));
    console.log(`Deleted item ${itemId} from DynamoDB`);

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item deleted successfully",
      }),
    };
  } catch (err) {
    // Handle errors
    console.error("Delete Lambda error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message || "Failed to delete item" }),
    };
  }
};

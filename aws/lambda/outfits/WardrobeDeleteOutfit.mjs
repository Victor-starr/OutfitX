import {
  DynamoDBClient,
  GetItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// AWS Clients
const region = process.env.AWS_MY_REGION;
const dynamo = new DynamoDBClient({ region });

// Named resources
const TABLE_NAME = process.env.OUTFIT_TABLE_NAME;

export const handler = async (event) => {
  // Extract outfitId from path parameters
  const itemId = event.pathParameters.outfitId;
  // Get user ID from authorizer
  const userId = event.requestContext.authorizer.jwt.claims.sub;

  try {
    // Prepare to get item from DynamoDB
    const payload = {
      TableName: TABLE_NAME,
      Key: {
        userId: { S: userId },
        outfitId: { S: itemId },
      },
    };
    // DynamoDB GetItem to fetch the pointed item
    const data = await dynamo.send(new GetItemCommand(payload));
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item not found" }),
      };
    }

    // Unmarshall AKA convert DynamoDB format to normal JSON
    const item = unmarshall(data.Item);

    // Delete from DynamoDB
    const deleteParams = {
      TableName: TABLE_NAME,
      Key: {
        userId: { S: userId },
        outfitId: { S: itemId },
      },
    };

    // Perform the delete operation
    await dynamo.send(new DeleteItemCommand(deleteParams));

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item deleted successfully",
        data: item,
      }),
    };
  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message || "Error deleting item",
      }),
    };
  }
};

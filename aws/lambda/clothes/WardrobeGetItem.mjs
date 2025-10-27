import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// AWS Clients
const region = process.env.AWS_MY_REGION; // S3 and DynamoDB
const dynamo = new DynamoDBClient({ region });

// Named resources
const TABLE_NAME = process.env.WARDROBE_TABLE_NAME;

export const handler = async (event) => {
  try {
    // Extract itemId from path parameters and userId from authorizer
    const itemId = event.pathParameters.itemId;
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    // Prepare DynamoDB GetItem parameters
    const payload = {
      TableName: TABLE_NAME,
      Key: {
        userId: { S: userId },
        itemId: { S: itemId },
      },
    };

    // Send GetItem command to DynamoDB
    const data = await dynamo.send(new GetItemCommand(payload));
    console.log("DynamoDB response:", data);

    // If item not found, return 404
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item not found" }),
      };
    }
    // Unmarshall AKA convert DynamoDB format to normal JSON
    const item = unmarshall(data.Item);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item fetched successfully",
        data: item,
      }),
    };
  } catch (err) {
    // Handle errors
    console.error("Error fetching data:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message || "Failed to fetch data",
      }),
    };
  }
};

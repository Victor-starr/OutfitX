import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// AWS Clients
const region = process.env.AWS_MY_REGION;
const dynamo = new DynamoDBClient({ region });

// Named resources
const TABLE_NAME = process.env.OUTFIT_TABLE_NAME;

export const handler = async (event) => {
  try {
    // Get user ID from authorizer
    const userId = event.requestContext?.authorizer?.jwt?.claims?.sub;

    // Prepare DynamoDB query to fetch all items for the user
    const payload = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": { S: userId },
      },
    };

    // Execute the query
    const data = await dynamo.send(new QueryCommand(payload));
    // Unmarshall the items from DynamoDB format to normal JSON
    const items = (data.Items || []).map((item) => unmarshall(item));

    // Return success response with items
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Items fetched successfully",
        data: items,
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

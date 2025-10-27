import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// AWS Clients
const region = process.env.AWS_MY_REGION;
const dynamo = new DynamoDBClient({ region });

// Named resources
const TABLE_NAME = process.env.OUTFIT_TABLE_NAME;

export const handler = async (event) => {
  try {
    // Extract itemId from path parameters and userId from authorizer
    const outfitId = event.pathParameters.outfitId;
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    // Prepare DynamoDB GetItem parameters
    const payload = {
      TableName: TABLE_NAME,
      Key: {
        userId: { S: userId },
        outfitId: { S: outfitId },
      },
    };
    // Send GetItem command to DynamoDB
    const data = await dynamo.send(new GetItemCommand(payload));
    console.log("DynamoDB response:", data);

    // If item not found, return 404
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Outfit not found" }),
      };
    }
    // Unmarshall AKA convert DynamoDB format to normal JSON
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Outfit fetched successfully",
        data: unmarshall(data.Item),
      }),
    };
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message || "Failed to fetch data",
      }),
    };
  }
};

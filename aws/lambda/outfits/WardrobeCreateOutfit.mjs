import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import crypto from "crypto";

// AWS Clients
const region = process.env.AWS_MY_REGION;
const dynamo = new DynamoDBClient({ region });

// Named resources
const TABLE_NAME = process.env.OUTFIT_TABLE_NAME;

export const handler = async (event) => {
  try {
    // Parse and validate input
    const payload = JSON.parse(event.body);
    // Get user ID from authorizer
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    // Generate unique outfit ID
    const outfitId = crypto.randomUUID();

    // Input validation checks
    if (
      !payload ||
      !payload.name ||
      Object.keys(payload.clothes || {}).length === 0
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid payload: 'name' and 'clothes' are required",
        }),
      };
    }

    // Prepare item for DynamoDB
    const item = {
      outfitId,
      userId,
      ...payload,
    };
    // Store item in DynamoDB and turning into DynamoDB format with marshall
    await dynamo.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: marshall(item),
      })
    );
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Outfit stored successfully",
        data: item,
      }),
    };
  } catch (err) {
    // Handle errors
    console.error("Error storing data:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message || "Failed to store data",
      }),
    };
  }
};

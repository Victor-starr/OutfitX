import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// AWS Clients
const region = process.env.AWS_MY_REGION;
const dynamodb = new DynamoDBClient({ region });

// Named resources
const TABLE_NAME = process.env.OUTFIT_TABLE_NAME;

export const handler = async (event) => {
  try {
    // Extract parameters
    const outfitId = event.pathParameters?.outfitId;
    // Get user ID from authorizer
    const userId = event.requestContext?.authorizer?.jwt?.claims?.sub;
    // Parse request body
    const body = JSON.parse(event.body);

    // Input validation check
    if (!outfitId || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing outfitId or userId" }),
      };
    }

    // Fetch existing outfit
    const getResponse = await dynamodb.send(
      new GetItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({ outfitId, userId }),
      })
    );

    // If outfit not found, return 404
    const existing = getResponse.Item && unmarshall(getResponse.Item);
    if (!existing) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Outfit not found" }),
      };
    }
    // Merge existing data with updates
    const updated = { ...existing, ...body, outfitId, userId };

    // Save updated outfit back to DynamoDB turning json to DynamoDB format
    await dynamodb.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: marshall(updated),
      })
    );
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Outfit updated successfully",
        data: updated,
      }),
    };
  } catch (err) {
    // Handle errors
    console.error("Error updating outfit:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message || "Failed to update outfit",
      }),
    };
  }
};

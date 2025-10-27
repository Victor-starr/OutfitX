import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  RekognitionClient,
  DetectLabelsCommand,
} from "@aws-sdk/client-rekognition";
import { marshall } from "@aws-sdk/util-dynamodb";
import crypto from "crypto";

// AWS Clients
const region = process.env.AWS_MY_REGION; // S3 and DynamoDB
const regionRekognition = process.env.AWS_MY_REGION_REKOGNITION; // Rekognition
const s3 = new S3Client({ region });
const dynamo = new DynamoDBClient({ region });
const rekognition = new RekognitionClient({ region: regionRekognition });

// Named resources
const BUCKET_NAME = process.env.WARDROBE_S3_BUCKET_NAME;
const TABLE_NAME = process.env.WARDROBE_TABLE_NAME;

// Clothing type mapping
const CLOTHING_MAP = {
  Tops: [
    "t-shirt",
    "shirt",
    "blouse",
    "hoodie",
    "sweater",
    "cardigan",
    "polo",
    "tank",
    "crop",
  ],
  Bottoms: [
    "jeans",
    "trousers",
    "pants",
    "shorts",
    "skirt",
    "leggings",
    "joggers",
  ],
  Outerwear: [
    "jacket",
    "coat",
    "blazer",
    "vest",
    "poncho",
    "cape",
    "windbreaker",
  ],
  Head: ["hat", "cap", "beanie", "scarf", "tie", "bowtie", "headband"],
  Feet: [
    "shoe",
    "shoes",
    "sneaker",
    "sneakers",
    "boot",
    "boots",
    "sandal",
    "sandals",
    "heel",
    "heels",
    "flat",
    "flats",
    "slipper",
    "slippers",
    "footwear",
    "running shoe",
    "sports shoe",
  ],
  Accessories: ["bag", "belt", "watch", "sunglasses", "jewelry", "gloves"],
};

// Remove.bg helper
async function removeBackground(imageBase64) {
  // Prepare request body
  const body = JSON.stringify({
    image_file_b64: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
    size: "auto",
    type: "product",
    format: "png",
  });
  // Call Remove.bg API
  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      "Content-Type": "application/json",
    },
    body,
  });
  // Handle response
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Remove.bg failed: ${text}`);
  }
  // Return image buffer
  return Buffer.from(await res.arrayBuffer());
}

export const handler = async (event) => {
  try {
    // Parse and validate input
    const { imageBase64, name, color, tags } = JSON.parse(event.body);
    // Get user ID from authorizer
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    // Generate unique item ID
    const itemId = crypto.randomUUID();

    // Input validation checks
    if (!imageBase64 || !imageBase64.startsWith("data:image/")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid or missing image data" }),
      };
    }
    if (!name || !color) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name and color are required" }),
      };
    }
    if (!tags || tags.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "At least one tag is required" }),
      };
    }

    //  Calling Remove.bg helper to remove background from the image
    const removedBgBuffer = await removeBackground(imageBase64);

    // Analyze image with Rekognition to get labels
    const detectLabels = await rekognition.send(
      new DetectLabelsCommand({
        Image: { Bytes: removedBgBuffer },
        MaxLabels: 10,
        MinConfidence: 50,
      })
    );

    // Determine clothing category and type from labels
    const labels = Array.isArray(detectLabels.Labels)
      ? detectLabels.Labels.map((l) => l.Name.toLowerCase())
      : [];

    let category = null;
    let type = null;
    // Iterate through clothing map to find a match
    for (const [cat, types] of Object.entries(CLOTHING_MAP)) {
      const match = types.find((t) =>
        labels.some((lbl) => lbl.toLowerCase().includes(t))
      );
      if (match) {
        category = cat;
        type = match;
        break;
      }
    }
    // If no category found, return error
    if (!category) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Image not recognized as valid clothing",
        }),
      };
    }
    // Upload processed image to S3 by first making a unique key so only this user can access it
    const key = `clothes/${userId}/${itemId}.png`;
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: removedBgBuffer,
        ContentType: "image/png",
      })
    );
    const s3Url = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;
    // Save item metadata to DynamoDB and turn the data into DynamoDB format using marshall
    const item = marshall({
      userId,
      itemId,
      name,
      category,
      color,
      type,
      imageURL: s3Url,
      s3Key: key,
      tags,
    });
    // Save item into DynamoDB table
    await dynamo.send(
      new PutItemCommand({ TableName: TABLE_NAME, Item: item })
    );
    // Return success response
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Item saved successfully",
        data: {
          userId,
          itemId,
          name,
          category,
          type,
          color,
          tags,
          imageURL: s3Url,
        },
      }),
    };
  } catch (err) {
    // Handle errors
    console.error("Lambda error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message || "Failed to save item" }),
    };
  }
};

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  RekognitionClient,
  DetectLabelsCommand,
} from "@aws-sdk/client-rekognition";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// AWS Clients
const region = process.env.AWS_MY_REGION; // S3 and DynamoDB
const regionRekognition = process.env.AWS_MY_REGION_REKOGNITION; // Rekognition
const s3 = new S3Client({ region });
const dynamodb = new DynamoDBClient({ region });
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
  Feet: ["sneakers", "boots", "sandals", "flats", "heels", "shoes", "slippers"],
  Accessories: ["bag", "belt", "watch", "sunglasses", "jewelry", "gloves"],
};

// Remove.bg helper
async function removeBackground(imageBase64) {
  const body = JSON.stringify({
    image_file_b64: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
    size: "auto",
    type: "product",
    format: "png",
  });

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Remove.bg failed: ${text}`);
  }

  return Buffer.from(await res.arrayBuffer());
}

export const handler = async (event) => {
  try {
    // Parse and validate input
    const { itemId, newAttributes } = JSON.parse(event.body);
    // Get user ID from authorizer
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    // Destructure new attributes
    const { name, color, tags, imageBase64 } = newAttributes;
    // Define S3 key and URL
    const key = `clothes/${userId}/${itemId}.jpg`;
    const s3Url = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;

    // Fetch existing item
    const { Item } = await dynamodb.send(
      new GetItemCommand({
        TableName: TABLE_NAME,
        Key: { userId: { S: userId }, itemId: { S: itemId } },
      })
    );
    //  If item not found, return 404
    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item not found" }),
      };
    }
    // Unmarshall AKA convert DynamoDB format to normal JSON
    const existingItem = unmarshall(Item);

    // Initialize new category and type
    let newCategory = existingItem.category;
    let newType = existingItem.type;

    const isNewImage = imageBase64?.startsWith("data:image/");
    // If new image provided, process it
    if (isNewImage) {
      if (existingItem.s3Key) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: existingItem.s3Key,
          })
        );
      }
      // Call Remove.bg helper to remove background
      const bgRemovedBuffer = await removeBackground(imageBase64);

      // Upload new image to S3
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: bgRemovedBuffer,
          ContentType: "image/png",
        })
      );
      // Use Rekognition to detect labels
      const detectLabels = await rekognition.send(
        new DetectLabelsCommand({
          Image: { Bytes: bgRemovedBuffer },
          MaxLabels: 10,
          MinConfidence: 70,
        })
      );
      // Determine new category and type from labels
      const labels = Array.isArray(detectLabels.Labels)
        ? detectLabels.Labels.map((l) => l.Name.toLowerCase())
        : [];

      for (const [cat, types] of Object.entries(CLOTHING_MAP)) {
        const match = types.find((t) => labels.some((lbl) => lbl.includes(t)));
        if (match) {
          newCategory = cat;
          newType = match;
          break;
        }
      }
    }
    // Prepare updated item
    const updatedItem = {
      ...existingItem,
      name: name || existingItem.name,
      color: color || existingItem.color,
      category: newCategory,
      type: newType,
      tags: Array.isArray(tags) ? tags : existingItem.tags,
      imageURL: s3Url,
      s3Key: key,
    };
    // Save updated item to DynamoDB ( format the item using marshall )
    await dynamodb.send(
      new PutItemCommand({ TableName: TABLE_NAME, Item: marshall(updatedItem) })
    );
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item updated successfully",
        data: updatedItem,
      }),
    };
  } catch (error) {
    // Handle errors
    console.error("Error updating item:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update item" }),
    };
  }
};

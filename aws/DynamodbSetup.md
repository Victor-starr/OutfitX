# DynamoDB Setup | [Back to README](/aws/README.md)

## Overview

This guide explains how to create and configure DynamoDB tables for storing user data and outfit information in the **Outfit-X** application.

## Usage in Outfit-X

- Storing user wardrobe clothing items
- Storing user outfit combinations

> 💡 Although I could use RDS, DynamoDB is a great fit for serverless applications and offers scalability, simplicity, and cost efficiency.

---

## Steps to Create a DynamoDB Table

1. Go to the [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/home).
2. Click **Create table**.

### 🧩 WardrobeTableStarr

1. **Table name:** `WardrobeTableStarr`
2. **Partition key:** `userId` (String)
3. **Sort key:** `itemId` (String)
4. Keep default settings
5. Click **Create table**

### 🧩 OutfitTableStarr

1. **Table name:** `OutfitTableStarr`
2. **Partition key:** `userId` (String)
3. **Sort key:** `outfitId` (String)
4. Keep default settings
5. Click **Create table**

Creation example:  
![DynamoDB Created Tables Screenshot](/aws/assets/steps_screen_shots/dynamodb_created_tables.png)

> ⚠️ No additional indexes or policies are needed for now.  
> IAM roles in your Lambda functions will handle access permissions.

---

### Next Steps

Proceed to S3 setup :[S3 Bucket Setup Guide](/aws/S3BucketSetup.md)

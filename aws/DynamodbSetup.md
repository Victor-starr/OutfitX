# DynamoDB Setup | [Back to README](/aws/README.md)

## Overview

This guide walks through the process of creating and configuring DynamoDB tables used by the **Outfit-X** application to store user wardrobe items and outfit information.

## Usage in Outfit-X

- Store user wardrobe clothing items
- Store user outfit combinations

> 💡 While an RDS database could also work, **DynamoDB** is a more suitable choice for serverless applications due to its scalability, simplicity, and cost-efficiency.

---

## Creating DynamoDB Tables

Follow the steps below to create the required tables.

1. Open the [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/home).
2. Click **Create table**.

---

### WardrobeTableStarr

1. **Table name:** `WardrobeTableStarr`
2. **Partition key:** `userId` _(String)_
3. **Sort key:** `itemId` _(String)_
4. Leave other settings at their default values.
5. Click **Create table**.

---

### OutfitTableStarr

1. **Table name:** `OutfitTableStarr`
2. **Partition key:** `userId` _(String)_
3. **Sort key:** `outfitId` _(String)_
4. Leave other settings at their default values.
5. Click **Create table**.

---

**Example:**
![DynamoDB Created Tables Screenshot](/aws/assets/steps_screen_shots/dynamodb_created_tables.png)

> ⚠️ No additional indexes or custom policies are required at this stage.
> Lambda functions will handle access permissions through their configured **IAM roles**.

---

## Next Steps

Continue with the next setup guide: [S3 Bucket Setup](/aws/S3BucketSetup.md)

# Outfit-X AWS Documentation

![AWS Architecture Overview](/aws/assets/aws_skeleton_img/skeleton_glob.png)

## Introduction

This directory contains detailed documentation for how AWS services are used in the Outfit-X application and how they interact to form a complete serverless architecture.

## Table of Contents

- [Introduction](#introduction)
- [AWS Services Used](#aws-services-used)
- [Architecture Overview](#architecture-overview)
- [Setup Instructions](#setup-instructions)
  - [Cognito User Pool Setup](#cognito-user-pool-setup)
  - [DynamoDB Table Creation](#dynamodb-table-creation)
  - [S3 Bucket Configuration](#s3-bucket-configuration)
  - [API Gateway Configuration](#api-gateway-configuration)
  - [Lambda Function Deployment](#lambda-function-deployment)
- [Integration with Outfit-X](#integration-with-outfit-x)

---

## AWS Services Used

- **Cognito User Pool** – for user authentication and management
- **API Gateway** – for creating and managing RESTful APIs
- **Lambda Functions** – for serverless compute logic
- **DynamoDB** – for NoSQL data storage
- **S3** – for image and file storage
- **IAM Roles & Policies** – for secure access management
- **CloudWatch** – for logging and monitoring
- **Remove.bg** – third-party API for background removal
- **Rekognition** – for image analysis and moderation

---

## Architecture Overview

The architecture uses **Cognito** for user authentication, **API Gateway** to handle incoming API requests, and **Lambda functions** to process logic.  
**DynamoDB** stores structured data, while **S3** is used for image storage.  
**IAM roles and policies** manage secure communication between services.  
**Rekognition** analyzes uploaded images, and **Remove.bg** is integrated through Lambda to remove image backgrounds.

---

## Setup Instructions

### Cognito User Pool Setup

Follow the Cognito setup instructions here:  
=> [Cognito Setup Guide](/aws/CognitoSetup.md)

### DynamoDB Table Creation

Follow the DynamoDB setup instructions here:  
=> [DynamoDB Setup Guide](/aws/DynamoDBSetup.md)

### S3 Bucket Configuration

Follow the S3 setup instructions here:  
=> [S3 Bucket Setup Guide](/aws/S3BucketSetup.md)

### API Gateway Configuration

=> [API Gateway Setup Guide](/aws/APIGatewaySetup.md)

### Lambda Function Deployment

=> [Lambda Setup Guide](/aws/LambdaSetup.md)

---

## Integration with Outfit-X

All these AWS components together power the **Outfit-X** platform:

- **Frontend** authenticates users via Cognito.
- **API Gateway** routes client requests.
- **Lambda functions** handle business logic.
- **DynamoDB** stores user wardrobes and outfits.
- **S3** stores uploaded images.
- **Rekognition** and **Remove.bg** handle image intelligence.

This serverless architecture ensures scalability, low cost, and efficient performance.

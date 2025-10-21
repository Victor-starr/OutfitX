# S3 Bucket Setup

## Overview

This guide describes how to create and configure an Amazon S3 bucket for storing images in the **Outfit-X** application.

## Usage in Outfit-X

- Storing wardrobe clothing item images

---

## Steps to Create an S3 Bucket

1. Navigate to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/home).
2. Click **Create bucket**.
3. Enter a unique name (e.g., `wardrobe-s3-starr`) and select a region.
4. **Uncheck** “Block all public access” so images can be accessed via URL.
   > ⚠️ S3 bucket names must be globally unique.
5. Click **Create bucket**.

Example:  
![S3 Bucket Created Screenshot](/aws/assets/steps_screen_shots/s3_bucket_create.png)

6. Inside the bucket, create a folder named `wardrobe-images/`.
7. Open the **Permissions** tab.
8. Edit the **Bucket policy** and add:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Replace `your-bucket-name` with your actual S3 bucket name, then **Save**.

Final result example:
![S3 Bucket Policy Screenshot](/aws/assets/steps_screen_shots/se_bucket_policy.png)

---

### Next Steps

Proceed to API Gateway configuration: [API Gateway Setup Guide](/aws/APIGatewaySetup.md)

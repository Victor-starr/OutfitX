# S3 Bucket Setup | [Back to AWS README](/aws/README.md)

## Overview

This guide explains how to create and configure an Amazon S3 bucket for storing images in the **Outfit-X** application.

## Usage in Outfit-X

The S3 bucket will be used for:

- Storing wardrobe clothing item images for the app.

---

## Steps to Create an S3 Bucket

1. Navigate to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/home).
2. Click **Create bucket**.
3. Enter a unique bucket name (e.g., `wardrobe-s3-starr`) and select the desired region.

   > ⚠️ S3 bucket names must be globally unique across all AWS accounts.

4. **Uncheck** the “Block all public access” option to allow images to be accessed via URL.
5. Click **Create bucket**.

Example screenshot:
![S3 Bucket Created Screenshot](/aws/assets/steps_screen_shots/s3_bucket_create.png)

6. Inside the bucket, create a folder named `wardrobe-images/`.
7. Go to the **Permissions** tab.
8. Edit the **Bucket policy** and add the following JSON:

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

> ⚠️ Replace `your-bucket-name` with your actual S3 bucket name before saving.

Click **Save** once done.

Final result example:
![S3 Bucket Policy Screenshot](/aws/assets/steps_screen_shots/se_bucket_policy.png)

---

## Next Steps

After configuring your S3 bucket, proceed to API Gateway setup:
[API Gateway Setup Guide](/aws/APIGatewaySetup.md)

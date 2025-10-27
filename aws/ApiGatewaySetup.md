# API Gateway Setup | [Back to AWS README](/aws/README.md)

## Overview

This guide explains how to set up **AWS API Gateway** to create a RESTful API for the **Outfit-X** application.
API Gateway acts as the bridge between the frontend application and backend services such as AWS Lambda functions.

---

## Create a New API

1. Go to the [AWS API Gateway Console](https://console.aws.amazon.com/apigateway/home).
2. Click **Create API**.
3. Select **HTTP API**, then click **Build**.
4. Enter a name for your API (e.g., `OutfitXAPI`) and keep the default settings.
5. Click **Create API**.

> After a few seconds, your API should be created and displayed like this:
> ![API Gateway Overview](/aws/assets/steps_screen_shots/create_apigateway.png)

---

## Define Routes

1. In the left sidebar, select **Routes**.
2. Click **Create** to add a new route.

### Clothes Routes (CRUD)

- `GET /clothes` — Retrieve all clothes
- `GET /clothes/{clotheId}` — Retrieve a specific clothe by ID
- `POST /clothes` — Create a new clothe
- `PUT /clothes/{clotheId}` — Update an existing clothe by ID
- `DELETE /clothes/{clotheId}` — Delete a clothe by ID

### Outfit Routes (CRUD)

- `GET /outfits` — Retrieve all outfits
- `GET /outfits/{outfitId}` — Retrieve a specific outfit by ID
- `POST /outfits` — Create a new outfit
- `PUT /outfits/{outfitId}` — Update an existing outfit by ID
- `DELETE /outfits/{outfitId}` — Delete an outfit by ID

### Profile Deletion Route

- `DELETE /profile` — Delete all user data (clothes and outfits)

💡 **Note:** The `{outfitId}` and `{clotheId}` parameters are dynamic path variables that will be passed to the Lambda function for processing.

> After defining all routes, your screen should look something like this:
> ![API Gateway Routes](/aws/assets/steps_screen_shots/addrouters_apigateway.png)

Now that all routes are defined, the next step is to add **integrations** — these determine what happens when a request hits a specific route.
In our case, each route will trigger a corresponding **AWS Lambda** function.
We’ll also configure **authentication** using **AWS Cognito User Pools** to ensure only authenticated users can access the API.

---

## Add Authentication

1. In the left sidebar, click **Authorizers**.
2. At the top of the page, click **Manage authorizers**.
3. Click **Create**.
4. Configure the authorizer as follows:

   - **Type:** `JWT`
   - **Name:** `WardrobeAuth` (or any name you prefer)
   - **Issuer URL:** `https://cognito-idp.<region>.amazonaws.com/<user-pool-id>`
   - **Audience:** `<app-client-id>`

💡 **Tip:**
You can find the `Issuer URL` and `Audience` values in your [Cognito User Pool](https://console.aws.amazon.com/cognito/home):

- Go to your User Pool → **Overview**, and copy the **Token signing key URL** (omit `/.well-known/jwks.json` at the end).
- Then, navigate to **App clients**, and copy the **Client ID** from the list.

> Once configured, your authorizer setup should look like this:
> ![API Gateway Authorizer](/aws/assets/steps_screen_shots/create_auth_apigateway.png)

5. Click **Create** to save the authorizer.

---

## Apply Authorizer to Routes

1. In the left sidebar, go to the **Authentication** tab.
2. Select a route from the list.
3. Under the **Authorization** dropdown, select your `WardrobeAuth` authorizer.
4. Click **Attach authorizer** to apply the changes.
5. Repeat steps 2–4 for all routes that require authentication.

💡 **Recommendation:**
Apply authentication to all routes, except perhaps a simple `/health` or `/ping` endpoint if you have one.

> After applying the authorizer to all routes, your screen should look like this:
> ![API Gateway Apply Authorizer](/aws/assets/steps_screen_shots/apply_auth_apigateway.png)

---

## Add Integrations

⚠️ **Before continuing:**
Make sure you have already created the required AWS Lambda functions for each route as described in the [Lambda Setup Guide](/aws/LambdaSetup.md).

1. In the left sidebar, click **Integrations**.
2. Select the route you want to link to a Lambda function.
3. Click **Create and attach an integration**.
4. Configure the integration as follows:

   - **Integration target:** `Lambda function`
   - **AWS Region:** Select the region where your Lambda functions are hosted.
   - **Lambda function:** Choose the corresponding function for the selected route.

5. Click **Create** to save the integration.
6. Repeat steps 2–5 for all routes, assigning the correct Lambda function to each.

> After all integrations are added, your screen should look like this:
> ![API Gateway Integrations](/aws/assets/steps_screen_shots/added_integration_apigateway.png)

---

## Final Notes

**Congratulations!** You’ve successfully set up **AWS API Gateway** for the **Outfit-X** application!
By default, your API is deployed to the **default stage**.

⚠️ **Important:**
If your Lambda functions don’t yet include the correct **resource-based policies** allowing API Gateway to invoke them, refer to the [Lambda Setup Guide](/aws/LambdaSetup.md) for details on granting those permissions.

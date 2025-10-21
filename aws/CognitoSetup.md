# Cognito Setup | [Back to AWS README](/aws/README.md)

## 1. Create a New User Pool

1. Navigate to the [AWS Cognito Console](https://console.aws.amazon.com/cognito).
2. Create a new **User Pool** and configure the following options:

   - **Application type:** `SPA (Single Page Application)`
   - **App name:** `OutfitXApp`
   - **Sign-in identifiers:** `Email address and Username`
   - **Required attributes:** `Email`
   - **Return URL(s):** `http://localhost:5173/` (for local development)

> ⚠️ In production, always use `https` and replace localhost URLs with your live domain.

Example User Pool configuration:  
![Cognito User Pool Setup](/aws/assets/steps_screen_shots/create_cognito_userPool.png)

---

## 2. Create an App Client

1. In the left sidebar, select **App clients**.
2. Click **Create app client** and name it something like `My SPA App - ej6cwr`.

---

## 3. Configure the Login Page

1. Go to the **Login page** section and click **Edit**.
2. Ensure local development URLs are using `http`.

   - **Allowed sign-out URLs:** `http://localhost:5173/`
   - **OpenID Connect scopes:** check `email`, `phone`, `openid`, and `profile`

Resulting screen example:  
![Cognito App Client Settings](/aws/assets/steps_screen_shots/edit_login_page_cognito.png)

---

## 4. Configure Your React Application

Install the required dependencies:

```bash
npm install oidc-client-ts react-oidc-context --save
```

Then create a .env file in the root of your React project:

```bash
VITE_AUTHORITY=https://cognito-idp.<region>.amazonaws.com/<user-pool-id>
VITE_CLIENT_ID=<your-client-id>
VITE_REDIRECT_URI=http://localhost:<port>/
VITE_LOGOUT_URI=http://localhost:<port>/
VITE_COGNITO_DOMAIN=https://<your-cognito-domain>.auth.<region>.amazoncognito.com
VITE_API_GATEWAY_URL=https://<your-api-id>.execute-api.<region>.amazonaws.com
```

Replace placeholders (<region>, <user-pool-id>, etc.) with actual values provided in your Cognito setup.

---

## 5. Wrap Your Application with the Auth Provider

```typescript
const cognitoAuthConfig = {
  authority: import.meta.env.VITE_AUTHORITY as string,
  client_id: import.meta.env.VITE_CLIENT_ID as string,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI as string,
  response_type: "code",
  scope: "email openid phone profile",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider {...cognitoAuthConfig}>
        <Root />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```

---

## 6. Use the `useAuth` Hook in Components

Example **Nav** component with login and logout functionality:

```typescript
const Nav = () => {
  const auth = useAuth();

  const handleLogin = () => auth.signinRedirect();

  const handleLogout = () => {
    auth.removeUser();
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_LOGOUT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return (
    <nav>
      <h1>Hello, {auth.user?.profile["cognito:username"]}</h1>
      <pre>Email: {auth.user?.profile.email}</pre>
      <br />
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleLogin}>Login</button>
    </nav>
  );
};

export default Nav;
```

---

## ✅ Congratulations

You have successfully configured **AWS Cognito** for the Outfit-X application.
Your users can now sign up, sign in, and authenticate securely.

### Next Steps

Proceed to create DynamoDB tables: [DynamoDB Setup Guide](/aws/DynamoDBSetup.md)

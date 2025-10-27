# Cognito Setup | [← Back to AWS README](/aws/README.md)

## 1. Create a New User Pool

1. Open the [AWS Cognito Console](https://console.aws.amazon.com/cognito).
2. Click **Create user pool**, then configure the following options:

   - **Application type:** `SPA (Single Page Application)`
   - **App name:** `OutfitXApp`
   - **Sign-in identifiers:** `Email address and Username`
   - **Required attributes:** `Email`
   - **Return URL(s):** `http://localhost:5173/` (for local development)

> ⚠️ **Important:** In production, always use `https` and replace any `localhost` URLs with your live domain.

**Example configuration:**
![Cognito User Pool Setup](/aws/assets/steps_screen_shots/create_cognito_userPool.png)

---

## 2. Create an App Client

1. In the left sidebar, navigate to **App clients**.
2. Click **Create app client** and give it a descriptive name — for example, `OutfitX SPA Client - ej6cwr`.

---

## 3. Configure the Login Page

1. Under your user pool, go to the **Login page** section and click **Edit**.
2. Update or confirm the following settings:

   - **Allowed sign-out URLs:** `http://localhost:5173/`
   - **OpenID Connect scopes:** enable `email`, `phone`, `openid`, and `profile`

**Example screen:**
![Cognito App Client Settings](/aws/assets/steps_screen_shots/edit_login_page_cognito.png)

> 💡 **Tip:** When moving to production, remember to add your deployed frontend domain to both the redirect and sign-out URLs.

---

## 4. Configure Your React Application

Install the required dependencies:

```bash
npm install oidc-client-ts react-oidc-context --save
```

Create a `.env` file in the root of your React project and define the following environment variables:

```bash
VITE_AUTHORITY=https://cognito-idp.<region>.amazonaws.com/<user-pool-id>
VITE_CLIENT_ID=<your-client-id>
VITE_REDIRECT_URI=http://localhost:<port>/
VITE_LOGOUT_URI=http://localhost:<port>/
VITE_COGNITO_DOMAIN=https://<your-cognito-domain>.auth.<region>.amazoncognito.com
VITE_API_GATEWAY_URL=https://<your-api-id>.execute-api.<region>.amazonaws.com
```

Replace placeholders (`<region>`, `<user-pool-id>`, etc.) with the actual values from your Cognito setup.

---

## 5. Wrap Your Application with the Auth Provider

In your main entry file (e.g., `main.tsx` or `index.tsx`), configure and initialize the Cognito authentication provider:

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

Here’s an example **Nav** component that handles both login and logout actions:

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

**Congratulations!**You’ve successfully configured **AWS Cognito** for the **Outfit-X** application.
Users can now securely sign up, sign in, and authenticate through your frontend.

### Next Steps

Continue with your backend setup:
[DynamoDB Setup Guide](/aws/DynamoDBSetup.md)

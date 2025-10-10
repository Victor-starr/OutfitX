import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "react-oidc-context";
import App from "@/App.tsx";
import "@/index.css";
import Nav from "@/components/_Nav.tsx";
import Footer from "@/components/Footer.tsx";
import { SWRConfig } from "swr";
import { localStorageProvider } from "./utils/localStorageProvider";

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
        <SWRConfig value={{ provider: localStorageProvider }}>
          <Nav />
          <App />
          <Footer />
        </SWRConfig>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router";

export default function AuthGuard() {
  const auth = useAuth();
  if (!auth) {
    return <div>Auth context not available</div>;
  }
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }
  if (auth.error) {
    return <div>Authentication error: {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated && !auth.isLoading) {
    auth.signinRedirect();
    return null;
  }

  return <Outlet />;
}

import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router";

export default function AuthGuard() {
  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect();
  }

  return <Outlet />;
}

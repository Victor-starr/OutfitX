import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router";

export default function GuestGuard() {
  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Authentication error: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

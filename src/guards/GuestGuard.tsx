import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router";

export default function GuestGuard() {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

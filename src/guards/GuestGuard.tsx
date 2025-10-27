import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router";

export default function GuestGuard() {
  const auth = useAuth();
  if (auth.isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen text-title text-4xl">
        <p>Loading...</p>
      </div>
    );
  }

  if (auth.error) {
    return <div>Authentication error: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

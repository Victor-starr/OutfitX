import { useAuth } from "react-oidc-context";
import { Outlet } from "react-router";

export default function AuthGuard() {
  const auth = useAuth();
  if (!auth) {
    return <div>Auth context not available</div>;
  }
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

  if (!auth.isAuthenticated && !auth.isLoading) {
    auth.signinRedirect();
    return null;
  }

  return <Outlet />;
}

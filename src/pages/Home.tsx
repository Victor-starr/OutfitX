import { useState } from "react";
import { useAuth } from "react-oidc-context";

export default function Home() {
  const [showTokens, setShowTokens] = useState(true);
  const auth = useAuth();

  const copyToClipboard = (token?: string) => {
    if (token) {
      navigator.clipboard.writeText(token);
    }
  };
  const signOutRedirect = () => {
    auth.removeUser();
    const clientId = import.meta.env.VITE_CLIENT_ID as string;
    const logoutUri = import.meta.env.VITE_LOGOUT_URI as string;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN as string;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
    return null;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  if (auth.isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
          <div className="mb-6">
            <h2 className="mb-2 font-bold text-2xl">
              Hello, {String(auth.user?.profile["cognito:username"])}
            </h2>
            <p className="text-gray-600">{String(auth.user?.profile.email)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              className="font-semibold text-blue-600"
              onClick={() => setShowTokens((prev) => !prev)}
            >
              {showTokens ? "Hide Tokens" : "Show Tokens"}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 ml-2 px-4 py-2 rounded text-white"
              onClick={() => signOutRedirect()}
            >
              Sign out
            </button>
          </div>
          {showTokens && (
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-32 font-medium">ID Token:</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm truncate">
                  {auth.user?.id_token?.slice(0, 16)}...
                </span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 ml-2 px-2 py-1 rounded text-white text-xs"
                  onClick={() => copyToClipboard(auth.user?.id_token)}
                >
                  Copy
                </button>
              </div>
              <div className="flex items-center">
                <span className="w-32 font-medium">Access Token:</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm truncate">
                  {auth.user?.access_token?.slice(0, 16)}...
                </span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 ml-2 px-2 py-1 rounded text-white text-xs"
                  onClick={() => copyToClipboard(auth.user?.access_token)}
                >
                  Copy
                </button>
              </div>
              <div className="flex items-center">
                <span className="w-32 font-medium">Refresh Token:</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm truncate">
                  {auth.user?.refresh_token?.slice(0, 16)}...
                </span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 ml-2 px-2 py-1 rounded text-white text-xs"
                  onClick={() => copyToClipboard(auth.user?.refresh_token)}
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

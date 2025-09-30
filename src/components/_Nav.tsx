import { useNavigate, Link } from "react-router";
import { useAuth } from "react-oidc-context";

const Nav = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    auth.signinRedirect();
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

  return (
    <nav className="relative flex items-center gap-4 px-4 py-4 border-gray-200 border-b">
      <Link to="/" className="font-bold text-xl">
        WardrobeApp
      </Link>
      <div className="flex items-center gap-4 ml-auto">
        <Link to="wardrobe/create" className="hover:underline">
          Add Clothes
        </Link>
        <Link to="/wardrobe" className="hover:underline">
          My Clothes
        </Link>
        {auth.isAuthenticated ? (
          <button
            onClick={signOutRedirect}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white"
          >
            Login
          </button>
        )}
      </div>
      <button
        onClick={handleGoBack}
        className="-bottom-10 left-0 absolute bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded text-white"
      >
        Go Back
      </button>
    </nav>
  );
};

export default Nav;

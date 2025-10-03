import { useAuth } from "react-oidc-context";
import { Link } from "react-router";
import Button from "./Button.tsx";

const Nav = () => {
  const auth = useAuth();

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
    <nav className="relative flex justify-between items-center gap-4 bg-card px-10 py-5">
      <Link to="/" className="font-bold text-title text-3xl">
        Outfit <span className="text-primary">X</span>
      </Link>
      <div className="flex items-center gap-5 text-title text-2xl">
        {auth.isAuthenticated ? (
          <>
            <Link to="wardrobe/create">Create</Link>
            <Link to="/wardrobe">Wardrobe</Link>
            <Button
              type="v1"
              color="primary"
              onClick={signOutRedirect}
              size="xl"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button type="v1" color="primary" onClick={handleLogin} size="xl">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;

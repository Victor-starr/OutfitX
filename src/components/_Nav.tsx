import { Link } from "react-router";
import { Button, LinkButton } from "@/components/Button";
import { useAuth } from "react-oidc-context";

interface NavProps {
  handleDeleteProfile: () => void;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  showDropdown: boolean;
}
const Nav = ({
  handleDeleteProfile,
  setShowDropdown,
  showDropdown,
}: NavProps) => {
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
    <nav className="relative flex justify-between items-center gap-4 bg-card shadow-md px-4 sm:px-6 lg:px-10 py-4 lg:py-5">
      <Link
        to="/"
        className="font-bold text-title hover:text-primary text-2xl sm:text-3xl transition-colors duration-200"
      >
        Outfit <span className="text-primary">X </span>
      </Link>

      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
        {auth.isAuthenticated ? (
          <>
            <div className="hidden sm:flex items-center gap-4 lg:gap-6">
              <LinkButton
                version="v3"
                to="/wardrobe"
                size="lg"
                className="px-3 py-2 hover:text-primary lg:text-xl"
              >
                Wardrobe
              </LinkButton>
              <LinkButton
                version="v3"
                to="/outfits"
                size="lg"
                className="px-3 py-2 hover:text-primary lg:text-xl"
              >
                Outfits
              </LinkButton>
            </div>

            <div className="relative">
              <Button
                version="v1"
                type="button"
                bgColor="primary"
                size="lg"
                className="px-4 lg:px-6 py-2 lg:py-2 font-semibold"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Profile
              </Button>
              {showDropdown && (
                <div className="right-0 -bottom-2 z-50 absolute flex flex-col bg-white shadow-lg mt-2 rounded-md w-48 translate-y-full">
                  <button
                    className="hover:bg-red-100 px-4 py-2 font-medium text-red-600 text-sm text-left"
                    onClick={handleDeleteProfile}
                  >
                    Profile Delete
                  </button>
                  <button
                    className="hover:bg-gray-100 px-4 py-2 font-medium text-sm text-left"
                    onClick={signOutRedirect}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Button
            version="v1"
            type="button"
            bgColor="primary"
            onClick={handleLogin}
            size="lg"
            className="px-4 lg:px-6 py-2 lg:py-2 font-semibold"
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;

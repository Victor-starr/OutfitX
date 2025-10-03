import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="bottom-0 left-0 relative flex justify-center items-center bg-card px-10 py-5 w-screen text-white text-2xl">
      <Link
        to="https://github.com/Victor-starr/OutfitX"
        target="_blank"
        className="flex items-center gap-2 hover:underline"
      >
        <FaGithub />
        Victor-starr / Outfit <span className="text-primary">X</span>
      </Link>
    </footer>
  );
};

export default Footer;

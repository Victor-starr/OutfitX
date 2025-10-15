import { useState } from "react";
import useWardrobe from "@/hook/useWardrobe";
import Nav from "@/components/_Nav.tsx";
import App from "@/App.tsx";
import Footer from "@/components/Footer.tsx";
import DeletePopUp from "@/components/DeletePopUp";
import "@/index.css";

function Root() {
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { ProfileFullDelete } = useWardrobe();

  const handleDeleteProfile = () => {
    setShowDeletePopUp(true);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setShowDeletePopUp(false);
    setShowDropdown(false);
  };

  const handleConfirm = async () => {
    await ProfileFullDelete();
    setShowDeletePopUp(false);
    setShowDropdown(false);
  };

  return (
    <>
      <Nav
        handleDeleteProfile={handleDeleteProfile}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
      />
      {showDeletePopUp && (
        <DeletePopUp
          title="Delete Profile"
          message="Are you sure you want to delete your profile? This action cannot be undone."
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      <App />
      <Footer />
    </>
  );
}
export default Root;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "@/axiosInstance";
import { useAuth } from "react-oidc-context";
import { Button } from "@/components/Button";
import { IoArrowBack } from "react-icons/io5";
import { WardrobeItemCardDetail } from "@/components/WardrobeItemCard";
interface WardrobeItem {
  itemId: string;
  userId: string;
  name: string;
  color: string;
  type: string;
  tags: string[];
  imageURL: string;
}
function Details() {
  const auth = useAuth();
  const { itemId } = useParams<{ itemId: string }>();
  const [items, setItems] = useState<WardrobeItem | null>(null);
  const navigate = useNavigate();

  const handleOneBack = () => {
    navigate(-1);
  };
  const handleDeleteItem = async (id: string) => {
    // TODO: implement delete functionality
    console.log("Delete item functionality to be implemented for id:", id);
  };
  useEffect(() => {
    async function fetchItem() {
      const res = await axiosInstance(`/clothes/${itemId}`, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      setItems(res.data);
      console.log("Fetched item details:", res.data);
    }

    fetchItem();
  }, [auth.user?.access_token, itemId]);

  return (
    <main className="relative flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Wardrobe Item Details
      </h1>
      <Button
        version="v1"
        type="button"
        bgColor="secondary"
        textColor="title"
        size="xl"
        className="top-15 left-15 absolute flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-xl"
        onClick={handleOneBack}
      >
        <IoArrowBack /> Back
      </Button>
      {items === null ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      ) : (
        <WardrobeItemCardDetail item={items} onDelete={handleDeleteItem} />
      )}
    </main>
  );
}

export default Details;

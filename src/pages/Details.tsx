import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "react-oidc-context";
import { Button } from "@/components/Button";
import { IoArrowBack } from "react-icons/io5";
import {
  ItemCardDetail,
  LoadingItemCardDetail,
} from "@/components/WardrobeItemCard";
import { getAxiosErrorMessage } from "@/utils/getAxoisErrorMsg";
import useApi from "@/hook/UseApi";
import { DetailData } from "@/data/Mocks";
import type { WardrobeItem } from "@/types/items_types";
const DEV: boolean = import.meta.env.VITE_DEV === "true";

function Details() {
  const auth = useAuth();
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<WardrobeItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const api = useApi();

  const handleOneBack = () => {
    navigate(-1);
  };
  const handleDeleteItem = async () => {
    if (auth.user?.profile?.sub !== item?.userId) {
      console.error("You are not authorized to delete this item.");
      return;
    }
    try {
      setIsLoading(true);
      if (!DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setItem(DetailData);
        console.log("Mock delete item with ID:", itemId);
      } else {
        const res = await api.delete(`/clothes/${itemId}`, {
          data: { itemId },
        });
        if (res.status !== 200) {
          throw new Error("Failed to delete the item.");
        }
      }
      navigate("/wardrobe");
      console.log("Deleting item with ID:", itemId);
    } catch (err) {
      console.error(getAxiosErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    async function fetchItem() {
      setIsLoading(true);
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        // setItem(DetailData);
        console.log("Using mock data for item details");
      } else {
        const res = await api.get(`/clothes/${itemId}`);
        setItem(res.data);
        console.table(res.data);
      }
      setIsLoading(false);
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

      {isLoading ? (
        <LoadingItemCardDetail />
      ) : item === null ? (
        <p className="flex justify-center items-center col-span-3 w-full text-muted text-xl lg:text-3xl text-center">
          No items found in this category.
        </p>
      ) : (
        <ItemCardDetail
          item={item}
          onDelete={handleDeleteItem}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}

export default Details;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "react-oidc-context";
import { Button } from "@/components/Button";
import { IoArrowBack } from "react-icons/io5";
import {
  ItemCardDetail,
  LoadingItemCardDetail,
} from "@/components/WardrobeItemCard";
import useWardrobe from "@/hook/useWardrobe";

function Details() {
  const auth = useAuth();
  const { itemId } = useParams<{ itemId: string }>();
  const { loading, result, fetchItem, handleDeleteItem } = useWardrobe({
    itemId,
  });
  const navigate = useNavigate();

  const handleOneBack = () => {
    navigate(-1);
  };

  useEffect(() => {
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

      {loading ? (
        <LoadingItemCardDetail />
      ) : result.data === null ? (
        <p className="flex justify-center items-center col-span-3 w-full text-muted text-xl lg:text-3xl text-center">
          No items found in this category.
        </p>
      ) : (
        <ItemCardDetail
          item={result.data[0]}
          onDelete={handleDeleteItem}
          isLoading={loading}
        />
      )}
    </main>
  );
}

export default Details;

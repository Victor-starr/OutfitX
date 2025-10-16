import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "react-oidc-context";
import useWardrobe from "@/hook/useWardrobe";
import NavigateBack from "@/components/NavigateBack";
import DeletePopUp from "@/components/DeletePopUp";
import {
  ItemCardDetail,
  LoadingItemCardDetail,
} from "@/components/WardrobeItemCard";

function ClothesDetails() {
  const auth = useAuth();
  const [deletePopUp, setDeletePopUp] = useState(false);
  const { itemId } = useParams<{ itemId: string }>();
  const { loading, result, fetchItem, handleDeleteItem } = useWardrobe({
    itemId,
  });

  useEffect(() => {
    fetchItem();
  }, [auth.user?.access_token, itemId]);

  return (
    <main className="relative flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Wardrobe Item Details
      </h1>
      {deletePopUp && (
        <DeletePopUp
          onCancel={() => setDeletePopUp(false)}
          onConfirm={handleDeleteItem}
          title="Delete Clothing Item"
          message="Are you sure you want to delete this clothing item? This action cannot be undone."
        />
      )}
      <NavigateBack url={-1} />

      {loading ? (
        <LoadingItemCardDetail />
      ) : result.data === null || result.status !== 200 ? (
        <p className="top-1/2 absolute flex justify-center items-center col-span-3 w-auto text-muted text-xl lg:text-3xl text-center">
          No items found in this category.
        </p>
      ) : (
        <ItemCardDetail
          item={result.data[0]}
          onDelete={() => setDeletePopUp(true)}
          isLoading={loading}
        />
      )}
    </main>
  );
}

export default ClothesDetails;

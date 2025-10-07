import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "@/axiosInstance";
import { useAuth } from "react-oidc-context";
import { Button } from "@/components/Button";
import { IoArrowBack } from "react-icons/io5";
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
        <article className="flex flex-col bg-card shadow-lg p-8 rounded-xl w-full max-w-xl h-fit">
          <img
            src={items.imageURL}
            alt={items.name}
            className="bg-surface mb-6 rounded-lg w-full h-72 object-center object-contain cursor-pointer"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-title text-2xl">{items.name}</h2>
            <p className="text-muted text-base">Type: {items.type}</p>
            <p className="text-muted text-base">Color: {items.color}</p>
            {items.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {items.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-secondary px-3 py-1 rounded text-title text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-gray-500">No tags</p>
            )}
          </div>
          <div className="flex flex-row justify-end gap-4 mt-8">
            {/* TODO: fix it to type link type of button */}
            <Button
              version="v2"
              textColor="primary"
              size="xl"
              type="button"
              className="px-6 py-2 rounded"
            >
              Edit
            </Button>
            <Button
              bgColor="secondary"
              textColor="title"
              version="v1"
              size="lg"
              type="button"
              className="px-6 py-2 rounded"
            >
              Delete
            </Button>
          </div>
        </article>
      )}
    </main>
  );
}

export default Details;

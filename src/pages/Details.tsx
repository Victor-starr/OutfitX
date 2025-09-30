import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../axiosInstance";
import { useAuth } from "react-oidc-context";
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
    <div className="bg-white shadow-lg mx-auto mt-8 rounded-lg max-w-md overflow-hidden">
      <div className="px-6 py-4">
        <h1 className="mb-4 font-bold text-gray-800 text-2xl text-center">
          Item Details
        </h1>
        {items ? (
          <div>
            <div className="flex justify-center mb-4">
              <img
                src={items.imageURL}
                alt={items.name}
                className="shadow border border-gray-200 rounded-lg w-64 h-64 object-cover"
              />
            </div>
            <div className="mb-2">
              <h2 className="font-semibold text-gray-900 text-xl">
                {items.name}
              </h2>
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center">
                <span className="w-24 font-medium text-gray-700">Type:</span>
                <span className="text-gray-600">{items.type}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-medium text-gray-700">Color:</span>
                <span className="text-gray-600">{items.color}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-medium text-gray-700">User ID:</span>
                <span className="text-gray-600">{items.userId}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 font-medium text-gray-700">Item ID:</span>
                <span className="text-gray-600">{items.itemId}</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Tags:</span>
              {items.tags && items.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {items.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-blue-100 shadow px-2 py-1 rounded-full font-medium text-blue-800 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-gray-500">No tags</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;

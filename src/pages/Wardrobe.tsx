import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import axiosInstance from "../axiosInstance";
interface WardrobeItem {
  itemId: string;
  userId: string;
  name: string;
  color: string;
  type: string;
  tags: string[];
  imageURL: string;
}
function Wardrobe() {
  const auth = useAuth();
  const [data, setData] = useState<WardrobeItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/clothes/getwardrobe", {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      if (res.status === 200) {
        setData(res.data);
        console.table("Fetched wardrobe items:", res.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-4 min-h-screen">
      <h1 className="mb-6 font-bold text-3xl">Your Wardrobe</h1>
      <p className="text-gray-700">
        This is where your wardrobe items will be displayed.
      </p>
      {data ? (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 w-full max-w-5xl">
          {data.map((item: WardrobeItem) => (
            <div
              key={item.itemId}
              className="flex flex-col bg-white shadow mb-4 p-4 rounded"
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="mb-2 rounded w-full h-48 object-cover"
              />
              <h2 className="mb-1 font-semibold text-xl">{item.name}</h2>
              <p className="mb-1 text-gray-600">Type: {item.type}</p>
              <p className="mb-1 text-gray-600">Color: {item.color}</p>
              {item.tags && (
                <div className="flex flex-wrap gap-2 mb-1">
                  {item.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading wardrobe items...</p>
      )}
    </div>
  );
}

export default Wardrobe;

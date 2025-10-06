import { useEffect, useState } from "react";
import AsideNav from "@/components/AsideNav";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import axiosInstance from "@/axiosInstance";

const CLOTHING_MAP = {
  Tops: [
    "t-shirt",
    "shirt",
    "blouse",
    "hoodie",
    "sweater",
    "cardigan",
    "polo",
    "tank",
    "crop",
  ],
  Bottoms: [
    "jeans",
    "trousers",
    "pants",
    "shorts",
    "skirt",
    "leggings",
    "joggers",
  ],
  Outerwear: [
    "jacket",
    "coat",
    "blazer",
    "vest",
    "poncho",
    "cape",
    "windbreaker",
  ],
  Head: ["hat", "cap", "beanie", "scarf", "tie", "bowtie", "headband"],
  Feet: ["sneakers", "boots", "sandals", "flats", "heels", "shoes", "slippers"],
  Accessories: ["bag", "belt", "watch", "sunglasses", "jewelry", "gloves"],
};

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
  const navigate = useNavigate();
  const auth = useAuth();
  const [data, setData] = useState<WardrobeItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const getFilteredItems = () => {
    if (activeCategory === "All") {
      return data;
    }

    const categoryItems =
      CLOTHING_MAP[activeCategory as keyof typeof CLOTHING_MAP];
    if (!categoryItems) {
      return data;
    }

    return data.filter((item) =>
      categoryItems.some((clothingType) =>
        item.type.toLowerCase().includes(clothingType.toLowerCase())
      )
    );
  };

  const filteredData = getFilteredItems();

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
  }, [auth.user?.access_token]);

  return (
    <main className="flex flex-col bg-bg py-8 pb-20 min-h-[calc(100vh-120px)]">
      <h1 className="mb-6 w-full font-bold text-title text-3xl text-center">
        Your Wardrobe
      </h1>
      <div className="flex gap-25 mx-auto w-full max-w-6xl">
        <AsideNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="flex-1 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
          {filteredData.length > 0 ? (
            filteredData.map((item: WardrobeItem) => (
              <div
                key={item.itemId}
                className="flex flex-col bg-card shadow p-4 rounded h-fit"
              >
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="bg-surface mb-3 rounded w-full h-48 object-center object-contain cursor-pointer"
                  onClick={() => navigate(`/wardrobe/details/${item.itemId}`)}
                />
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-title text-xl">
                    {item.name}
                  </h2>
                  <p className="text-muted text-sm">Type: {item.type}</p>
                  <p className="text-muted text-sm">Color: {item.color}</p>
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-secondary px-2 py-1 rounded text-title text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <p className="text-gray-500">Loading wardrobe items...</p>
          ) : (
            <p className="text-gray-500">No items found in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Wardrobe;

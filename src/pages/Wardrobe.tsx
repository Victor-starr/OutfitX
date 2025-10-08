import { useEffect, useState } from "react";
import AsideNav from "@/components/AsideNav";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import { ItemCard, LoadingItemCard } from "@/components/WardrobeItemCard";
import useApi from "@/hook/UseApi";
import { WardrobeData } from "@/data/Mocks";

const DEV: boolean = import.meta.env.VITE_DEV === "true";

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
  const api = useApi();

  const [data, setData] = useState<WardrobeItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setIsLoading(true);
      if (DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setData(WardrobeData);
        console.log("Using mock data for wardrobe");
      } else {
        const res = await api.get("/clothes/getwardrobe");
        if (res.status === 200) {
          setData(res.data);
          console.table("Fetched wardrobe items:", res.data);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [auth.user?.access_token]);

  return (
    <main className="flex flex-col bg-bg py-8 pb-20 min-h-[calc(100vh-120px)]">
      <h1 className="mb-6 w-full font-bold text-title text-3xl text-center">
        Your Wardrobe
      </h1>
      <div className="flex gap-5 lg:gap-25 mx-auto w-full max-w-6xl">
        <AsideNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="flex-1 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min pr-15 pl-5 w-full">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingItemCard key={index} />
            ))
          ) : filteredData.length === 0 ? (
            <p className="flex justify-center items-center col-span-3 w-full text-muted text-xl lg:text-3xl text-center">
              No items found in this category.
            </p>
          ) : (
            filteredData.map((item) => (
              <ItemCard
                key={item.itemId}
                item={item}
                onClick={() => navigate(`/wardrobe/${item.itemId}`)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Wardrobe;

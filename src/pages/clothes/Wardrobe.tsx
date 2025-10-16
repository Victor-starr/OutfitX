import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import useWardrobe from "@/hook/useWardrobe";
import AsideNav from "@/components/AsideNav";
import { ItemCard, LoadingItemCard } from "@/components/WardrobeItemCard";
import Hero from "@/components/Hero";

function Wardrobe() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { loading, result, fetchData } = useWardrobe();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    fetchData();
  }, [auth.user?.access_token]);

  const getFilteredItems = () => {
    if (activeCategory === "All") {
      return result.data;
    }

    return result.data.filter((item) => item.category === activeCategory);
  };

  const filteredData = getFilteredItems();

  return (
    <main className="flex flex-col bg-bg pb-36 min-h-[calc(100vh-120px)]">
      <Hero
        title="Your Wardrobe"
        subtitle="Manage your clothing items. Browse, add, and organize your wardrobe. Easily filter by category and create new outfits to suit any occasion."
        firstButtonText="Add Clothes"
        firstButtonLink="/wardrobe/create"
        secondButtonText="Create Outfit"
        secondButtonLink="/outfits/create"
        height="h-[40vh]"
      />
      <div className="flex lg:flex-row flex-col gap-5 lg:gap-25 mx-auto pt-15 w-full max-w-6xl">
        <AsideNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="flex-1 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min px-5 w-full">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingItemCard key={index} />
            ))
          ) : filteredData.length === 0 ? (
            <p className="flex justify-center items-center col-span-3 pt-35 w-full text-muted text-xl lg:text-3xl text-center">
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

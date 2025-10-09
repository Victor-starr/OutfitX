import { useState } from "react";
import AsideNav from "@/components/AsideNav";
import { useNavigate } from "react-router";
import { ItemCard, LoadingItemCard } from "@/components/WardrobeItemCard";
import useWardrobe from "@/hook/useWardrobe";

function Wardrobe() {
  const navigate = useNavigate();
  const { loading, result } = useWardrobe();

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const getFilteredItems = () => {
    if (activeCategory === "All") {
      return result.data;
    }

    return result.data.filter((item) => item.category === activeCategory);
  };

  const filteredData = getFilteredItems();

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
          {loading ? (
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

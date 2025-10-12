import Human from "@/assets/human.svg";
import { useEffect, useRef, useState } from "react";
import { FiWatch } from "react-icons/fi";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { TbJacket, TbShoe } from "react-icons/tb";
import { TbChefHat } from "react-icons/tb";
import useWardrobe from "@/hook/useWardrobe";
import { useAuth } from "react-oidc-context";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { ItemCard } from "@/components/WardrobeItemCard";
import type { WardrobeItem } from "@/types/clothing_types";
import type { OutfitSections } from "@/types/outfits_types";

function CreateOutfit() {
  const auth = useAuth();
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const { fetchData, result, loading } = useWardrobe();
  const [tags, setTags] = useState<string[] | null>(null);
  const [filteredItems, setFilteredItems] = useState<WardrobeItem[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState<
    WardrobeItem["category"] | null
  >(null);
  const [outfitSections, setOutfitSections] = useState<OutfitSections>({
    Head: null,
    Accessories: null,
    Outerwear: null,
    Tops: null,
    Bottoms: null,
    Feet: null,
  });

  useEffect(() => {
    fetchData();
  }, [auth.user?.access_token]);

  useEffect(() => {
    if (result.data && result.data.length > 0) {
      const uniqueTags = getUniqueClothingTags(result.data);
      setFilteredItems(result.data);
      console.log(result.data);
      setTags(["All", ...uniqueTags]);
    } else {
      setFilteredItems([]);
      setTags(null);
    }
  }, [result.data]);

  const getUniqueClothingTags = (items: WardrobeItem[]) => {
    const allTags: string[] = [];
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        const formattedTag =
          tag.split("")[0].toUpperCase() + tag.slice(1).toLowerCase();
        allTags.push(formattedTag);
      });
    });
    return Array.from(new Set(allTags));
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);

    const baseList = selectedCategory
      ? result.data.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : result.data;

    if (tag === "All") {
      setFilteredItems(baseList);
    } else {
      setFilteredItems(
        baseList.filter((item) =>
          item.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
        )
      );
    }
  };

  const handleSelectCategory = (category: WardrobeItem["category"]) => {
    setSelectedCategory(category);
    setSelectedTag("All");

    const filteredByCategory = result.data.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );

    setFilteredItems(filteredByCategory);
  };

  const handleItemClick = (item: WardrobeItem) => {
    if (!selectedCategory) return;

    if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      console.warn(
        `Cannot assign ${item.category} item to ${selectedCategory} slot`
      );
      return;
    }

    setOutfitSections((prev) => ({
      ...prev,
      [selectedCategory]: { ...item },
    }));
    setSelectedCategory(null);
  };

  return (
    <main className="relative flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Create Outfit
      </h1>
      <section className="flex flex-row justify-center items-center gap-15 px-10 rounded-2xl w-[90%] h-screen">
        <article className="relative flex justify-center items-center p-6 w-[35%] h-full">
          <img src={Human} alt="Human figure" className="z-1 w-full h-full" />
          <div className="top-0 left-0 z-2 absolute flex flex-col justify-center items-center gap-10 w-full h-full">
            <div className="flex flex-row gap-15 ml-35">
              <button
                onClick={() => handleSelectCategory("Head")}
                className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : outfitSections.Head ? (
                  <img
                    src={outfitSections.Head.imageURL}
                    alt={outfitSections.Head.name}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                ) : (
                  <TbChefHat color="white" size={30} />
                )}
              </button>
              <button
                onClick={() => handleSelectCategory("Accessories")}
                className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : outfitSections.Accessories ? (
                  <img
                    src={outfitSections.Accessories.imageURL}
                    alt={outfitSections.Accessories.name}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                ) : (
                  <FiWatch color="white" size={30} />
                )}
              </button>
            </div>
            <div className="flex flex-row gap-15 mr-35">
              <button
                onClick={() => handleSelectCategory("Outerwear")}
                className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : outfitSections.Outerwear ? (
                  <img
                    src={outfitSections.Outerwear.imageURL}
                    alt={outfitSections.Outerwear.name}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                ) : (
                  <TbJacket color="white" size={30} />
                )}
              </button>
              <button
                onClick={() => handleSelectCategory("Tops")}
                className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : outfitSections.Tops ? (
                  <img
                    src={outfitSections.Tops.imageURL}
                    alt={outfitSections.Tops.name}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                ) : (
                  <IoShirtOutline color="white" size={30} />
                )}
              </button>
            </div>
            <button
              onClick={() => handleSelectCategory("Bottoms")}
              className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl"
            >
              {loading ? (
                <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
              ) : outfitSections.Bottoms ? (
                <img
                  src={outfitSections.Bottoms.imageURL}
                  alt={outfitSections.Bottoms.name}
                  className="rounded-full w-8 h-8 object-cover"
                />
              ) : (
                <PiPants color="white" size={30} />
              )}
            </button>
            <button
              onClick={() => handleSelectCategory("Feet")}
              className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl"
            >
              {loading ? (
                <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
              ) : outfitSections.Feet ? (
                <img
                  src={outfitSections.Feet.imageURL}
                  alt={outfitSections.Feet.name}
                  className="rounded-full w-8 h-8 object-cover"
                />
              ) : (
                <TbShoe color="white" size={30} />
              )}
            </button>
          </div>
        </article>
        {selectedCategory && (
          <section className="flex flex-col flex-1 bg-surface px-5 rounded-2xl max-w-[65%] h-full max-h-[530px] overflow-y-scroll scrollbar-thin-gray">
            {tags && (
              <div className="top-0 sticky flex justify-center items-center bg-surface mb-6 py-2">
                <FaArrowAltCircleLeft
                  className="left-0 z-10 absolute bg-bg shadow-md p-1 rounded-full text-muted hover:text-title cursor-pointer"
                  size={35}
                  onClick={() => {
                    if (tagsContainerRef.current) {
                      tagsContainerRef.current.scrollBy({
                        left: -150,
                        behavior: "smooth",
                      });
                    }
                  }}
                />

                <div
                  ref={tagsContainerRef}
                  className="flex gap-2 px-2 max-w-[85%] overflow-x-auto scrollbar-thin-gray"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {tags.map((tag) => (
                    <p
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-4 py-2 mb-2 text-md whitespace-nowrap cursor-pointer rounded-2xl transition-colors
                  ${
                    selectedTag === tag
                      ? "bg-title text-onPrimary"
                      : " hover:bg-primary text-title text-onPrimary"
                  }`}
                    >
                      {tag}
                    </p>
                  ))}
                </div>

                <FaArrowAltCircleRight
                  className="right-0 z-10 absolute shadow-md p-1 rounded-full text-muted hover:text-title cursor-pointer"
                  size={35}
                  onClick={() => {
                    if (tagsContainerRef.current) {
                      tagsContainerRef.current.scrollBy({
                        left: 150,
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              </div>
            )}
            {filteredItems.length === 0 ? (
              <p className="flex justify-center items-center col-span-3 w-full text-muted text-xl lg:text-3xl text-center">
                No Outfit found.
              </p>
            ) : (
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                {filteredItems.map((item: WardrobeItem) => (
                  <ItemCard
                    key={item.itemId}
                    item={item}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export default CreateOutfit;

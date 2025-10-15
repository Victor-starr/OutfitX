import { useEffect, useRef, useState } from "react";
import useWardrobe from "@/hook/useWardrobe";
import useOutfits from "@/hook/useOutfit";
import { useAuth } from "react-oidc-context";
import { ItemCard } from "@/components/WardrobeItemCard";
import Button from "@/components/Button";
import OutfitSubmissionForm from "@/components/OutfitSubmissionForm";
import TagsFilter, { LoadingTagsFilter } from "@/components/TagsFilter";
import NavigateBack from "@/components/NavigateBack";
import type { WardrobeItem } from "@/types/clothing_types";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { TbJacket, TbShoe } from "react-icons/tb";
import { TbChefHat } from "react-icons/tb";
import { FiWatch } from "react-icons/fi";
import Human from "@/assets/human.svg";

function CreateOutfit() {
  const auth = useAuth();
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const {
    fetchData,
    result: ClothesResult,
    loading: ClothesLoading,
  } = useWardrobe();
  const {
    loading: OutfitLoading,
    handleOutfitSave,
    handleItemClick,
    setSelectedCategory,
    selectedCategory,
    outfitSections,
  } = useOutfits();
  const [tags, setTags] = useState<string[] | null>(null);
  const [filteredItems, setFilteredItems] = useState<WardrobeItem[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [showFinalForm, setShowFinalForm] = useState(false);
  useEffect(() => {
    fetchData();
  }, [auth.user?.access_token]);

  useEffect(() => {
    if (ClothesResult.data && ClothesResult.data.length > 0) {
      if (!selectedCategory) {
        const uniqueTags = getUniqueClothingTags(ClothesResult.data);
        setFilteredItems(ClothesResult.data);
        setTags(["All", ...uniqueTags]);
      } else {
        const itemsInCategory = ClothesResult.data.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        const uniqueTags = getUniqueClothingTags(itemsInCategory);
        setFilteredItems(itemsInCategory);
        setTags(["All", ...uniqueTags]);
      }
    } else {
      setFilteredItems([]);
      setTags(null);
    }
  }, [ClothesResult.data, selectedCategory]);

  const getUniqueClothingTags = (items: WardrobeItem[]) => {
    const allTags: string[] = [];
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        const formattedTag =
          tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
        allTags.push(formattedTag);
      });
    });
    return Array.from(new Set(allTags));
  };

  const filterItemsByTag = (tag: string) => {
    setSelectedTag(tag);

    const baseList = selectedCategory
      ? ClothesResult.data.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : ClothesResult.data;

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

    const filteredByCategory = ClothesResult.data.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );

    setFilteredItems(filteredByCategory);
  };

  const validateAndSaveOutfit = () => {
    if (Object.values(outfitSections).every((section) => section !== null)) {
      console.log("ALL CLOTHES ARE SELLECTED !:)");
      setShowFinalForm(true);
    } else {
      // TODO: Replace alert with a better UI notification
      alert("Please fill all sections of the outfit before saving.");
    }
  };

  return (
    <main className="relative flex flex-col items-center bg-bg py-5 h-[85vh] overflow-y-auto">
      <NavigateBack url="/outfits" />
      <h1 className="mb-4 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Create Outfit
      </h1>
      {showFinalForm && (
        <OutfitSubmissionForm
          onCancel={() => setShowFinalForm(false)}
          onSave={handleOutfitSave}
          outfitId=""
        />
      )}
      <section className="flex flex-row justify-center items-center gap-15 px-10 rounded-2xl w-[90%] h-[65vh]">
        <article className="relative flex justify-center items-center p-6 w-[35%] h-full">
          <img src={Human} alt="Human figure" className="z-1 w-full h-full" />
          <div className="top-0 left-0 z-2 absolute flex flex-col justify-center items-center gap-10 w-full h-full">
            <div className="flex flex-row gap-15 ml-35">
              <button
                onClick={() => handleSelectCategory("Head")}
                className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl"
              >
                {ClothesLoading ? (
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
                {ClothesLoading ? (
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
                {ClothesLoading ? (
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
                {ClothesLoading ? (
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
              {ClothesLoading ? (
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
              {ClothesLoading ? (
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
            {ClothesLoading ? (
              <LoadingTagsFilter />
            ) : (
              tags && (
                <TagsFilter
                  tags={tags}
                  tagsContainerRef={tagsContainerRef}
                  handleTagClick={filterItemsByTag}
                  selectedTag={selectedTag}
                />
              )
            )}
            {filteredItems.length === 0 ? (
              <p className="flex justify-center items-center col-span-3 mt-15 w-full text-muted text-xl lg:text-3xl text-center">
                No items found in this category
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
      <Button
        version="v1"
        type="button"
        bgColor="primary"
        textColor="title"
        size="lg"
        className="mt-2 px-10 py-3 rounded-2xl"
        onClick={validateAndSaveOutfit}
        disabled={OutfitLoading || ClothesLoading}
      >
        Save Outfit
      </Button>
    </main>
  );
}

export default CreateOutfit;

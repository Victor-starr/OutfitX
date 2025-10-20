import { useEffect, useRef, useState } from "react";
import useWardrobe from "@/hook/useWardrobe";
import useOutfits from "@/hook/useOutfit";
import { useAuth } from "react-oidc-context";
import Button from "@/components/Button";
import OutfitSubmissionForm from "@/components/OutfitSubmissionForm";
import NavigateBack from "@/components/NavigateBack";
import type { WardrobeItem } from "@/types/clothing_types";
import OutfitPickerSection from "@/components/OutfitPickerSection";
import AsideClothingPickerSection from "@/components/AsideClothingPickerSection";

function CreateOutfit() {
  const auth = useAuth();
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);
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
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");
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
      <section className="flex lg:flex-row flex-col justify-center items-center gap-15 lg:px-10 rounded-2xl w-full lg:w-[90%] h-screen lg:h-[65vh]">
        <OutfitPickerSection
          handleSelectCategory={handleSelectCategory}
          outfitSections={outfitSections}
          ClothesLoading={ClothesLoading}
        />
        {selectedCategory && (
          <div
            onClick={() => setSelectedCategory(null)}
            className={`${
              selectedCategory ? "lg:hidden absolute flex" : ""
            } top-0 left-0 w-full h-full justify-center items-center backdrop-blur-sm bg-black/30 z-20`}
          >
            <AsideClothingPickerSection
              tagsContainerRef={tagsContainerRef}
              Clothes={ClothesResult.data}
              ClothesLoading={ClothesLoading}
              setSelectedTag={setSelectedTag}
              selectedTag={selectedTag}
              tags={tags}
              setFilteredItems={setFilteredItems}
              filteredItems={filteredItems}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              handleItemClick={handleItemClick}
            />
          </div>
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
        {OutfitLoading || ClothesLoading ? "Loading..." : "Save Outfit"}
      </Button>
    </main>
  );
}

export default CreateOutfit;

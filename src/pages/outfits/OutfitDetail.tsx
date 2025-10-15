import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useOutfits from "@/hook/useOutfit";
import useWardrobe from "@/hook/useWardrobe";
import OutfitSubmissionForm from "@/components/OutfitSubmissionForm";
import NavigateBack from "@/components/NavigateBack";
import DeletePopUp from "@/components/DeletePopUp";
import Button from "@/components/Button";
import type { WardrobeItem } from "@/types/clothing_types";
import OutfitPickerSection from "@/components/OutfitPickerSection";
import AsideClothingPickerSection from "@/components/AsideClothingPickerSection";

function OutfitDetails() {
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const { outfitId } = useParams<{ outfitId: string }>();
  const [tags, setTags] = useState<string[] | null>(null);
  const [filteredItems, setFilteredItems] = useState<WardrobeItem[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const {
    result: OutfitResult,
    loading: OutfitLoading,
    handleItemClick,
    fetchOutfitById,
    setSelectedCategory,
    selectedCategory,
    outfitSections,
    handleOutfitUpdate,
    handleOutfitDelete,
  } = useOutfits();
  const {
    fetchData,
    result: ClothesResult,
    loading: ClothesLoading,
  } = useWardrobe();

  useEffect(() => {
    if (outfitId) {
      fetchOutfitById(outfitId);
      fetchData();
    }
  }, [outfitId]);
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
    setShowUpdateButton(true);
    setSelectedCategory(category);
    setSelectedTag("All");

    const filteredByCategory = ClothesResult.data.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );

    setFilteredItems(filteredByCategory);
  };

  const validateAndUpdateOutfit = () => {
    if (Object.values(outfitSections).every((section) => section !== null)) {
      console.log("All sections are filled. Proceeding to save the outfit.");
      setShowFinalForm(true);
    } else {
      console.warn("Please fill all sections of the outfit before saving.");
    }
  };

  return (
    <main className="relative flex flex-col items-center bg-bg py-4 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Outfit - {OutfitResult.data[0]?.name}
      </h1>
      <NavigateBack url={"/outfits"} />
      {showFinalForm && (
        <OutfitSubmissionForm
          onUpdate={handleOutfitUpdate}
          oldName={OutfitResult.data[0].name}
          oldTags={OutfitResult.data[0].tags}
          onCancel={() => setShowFinalForm(false)}
          outfitId={outfitId!}
        />
      )}
      {showDeletePopUp && (
        <DeletePopUp
          title="Delete Outfit"
          message="Are you sure you want to delete this outfit? This action cannot be undone."
          onCancel={() => setShowDeletePopUp(false)}
          onConfirm={() => handleOutfitDelete(outfitId!)}
        />
      )}
      {OutfitLoading ? (
        <p className="top-1/2 absolute flex justify-center items-center col-span-3 w-auto text-muted text-xl lg:text-3xl text-center">
          Loading...
        </p>
      ) : ClothesResult.data === null || ClothesResult.status !== 200 ? (
        <p className="top-1/2 absolute flex justify-center items-center col-span-3 w-auto text-muted text-xl lg:text-3xl text-center">
          No outfit found.
        </p>
      ) : (
        <>
          <section className="flex flex-row justify-center items-center gap-15 px-10 rounded-2xl w-[90%] h-[65vh]">
            <OutfitPickerSection
              handleSelectCategory={handleSelectCategory}
              outfitSections={outfitSections}
              ClothesLoading={ClothesLoading}
            />
            {selectedCategory && (
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
            )}
          </section>
          <div className="flex lg:flex-row flex-col justify-center items-center gap-4 mt-5">
            {showUpdateButton && (
              <Button
                version="v1"
                type="button"
                bgColor="secondary"
                textColor="title"
                size="lg"
                className="px-10 py-3 rounded-2xl"
                onClick={validateAndUpdateOutfit}
                disabled={OutfitLoading || ClothesLoading}
              >
                Update Outfit
              </Button>
            )}
            <Button
              version="v2"
              type="button"
              bgColor="primary"
              textColor="primary"
              size="lg"
              className="px-10 py-3 rounded-2xl"
              onClick={() => setShowDeletePopUp(true)}
              disabled={OutfitLoading || ClothesLoading}
            >
              Delete Outfit
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
export default OutfitDetails;

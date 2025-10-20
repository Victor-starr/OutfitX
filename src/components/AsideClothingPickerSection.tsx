import TagsFilter, { LoadingTagsFilter } from "./TagsFilter";
import { ItemCard } from "./WardrobeItemCard";
import type { WardrobeItem } from "@/types/clothing_types";

interface AsideClothingPickerSectionProps {
  tagsContainerRef: React.RefObject<HTMLDivElement | null>;
  Clothes: WardrobeItem[];
  ClothesLoading: boolean;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  selectedTag: string;
  tags: string[] | null;
  setFilteredItems: React.Dispatch<React.SetStateAction<WardrobeItem[]>>;
  filteredItems: WardrobeItem[];
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<WardrobeItem["category"] | null>
  >;
  selectedCategory: WardrobeItem["category"] | null;
  handleItemClick: (item: WardrobeItem) => void;
}

const AsideClothingPickerSection = ({
  tagsContainerRef,
  Clothes,
  ClothesLoading,
  setSelectedTag,
  selectedTag,
  tags,
  setFilteredItems,
  filteredItems,
  selectedCategory,
  handleItemClick,
}: AsideClothingPickerSectionProps) => {
  const filterItemsByTag = (tag: string) => {
    setSelectedTag(tag);

    const baseList = selectedCategory
      ? Clothes.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : Clothes;

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

  return (
    <section className="flex flex-col lg:flex-1 bg-surface px-5 lg:rounded-2xl w-full lg:max-w-[65%] h-[65vh] lg:max-h-[530px] overflow-y-scroll scrollbar-thin-gray">
      {ClothesLoading ? (
        <LoadingTagsFilter length={4} />
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
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
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
  );
};

export default AsideClothingPickerSection;

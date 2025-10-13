import Hero from "@/components/Hero";
import { OutfitCard, OutfitLoadingCard } from "@/components/OutfitItemCard";
import TagsFilter, { LoadingTagsFilter } from "@/components/TagsFilter";
import useOutfits from "@/hook/useOutfit";
import type { Outfit } from "@/types/outfits_types";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";

function Outfits() {
  const auth = useAuth();
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);
  const { loading, result, fetchOutfits } = useOutfits();
  const [tags, setTags] = useState<string[] | null>(null);
  const [filteredOutfits, setFilteredOutfits] = useState<Outfit[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    fetchOutfits();
  }, [auth.user?.access_token]);

  useEffect(() => {
    if (result.data && result.data.length > 0) {
      setFilteredOutfits(result.data);
      const uniqueTags = getUniqueTags(result.data);
      setTags(["All", ...uniqueTags]);
    } else {
      setFilteredOutfits([]);
      setTags(null);
    }
  }, [result.data]);

  const getUniqueTags = (outfits: Outfit[]) => {
    const allTags = outfits.flatMap((outfit) => outfit.tags);
    return Array.from(new Set(allTags));
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);

    if (tag === "All") {
      setFilteredOutfits(result.data);
    } else {
      setFilteredOutfits(
        result.data.filter((outfit: Outfit) => outfit.tags.includes(tag))
      );
    }
  };

  return (
    <main className="flex flex-col items-center bg-bg min-h-[calc(100vh-120px)]">
      <Hero
        height="h-[45vh]"
        title="Your Outfits"
        subtitle="Manage your outfits, filter them by tags, and create new looks for every occasion."
        firstButtonText="Create Outfit"
        firstButtonLink="/outfits/create"
        secondButtonText="Add Clothes"
        secondButtonLink="/wardrobe/create"
      />

      {loading ? (
        <LoadingTagsFilter />
      ) : (
        tags && (
          <div className="relative flex justify-center items-center my-10 pb-3 border-b border-border w-[85vw]">
            <TagsFilter
              tags={tags}
              tagsContainerRef={tagsContainerRef}
              handleTagClick={handleTagClick}
              selectedTag={selectedTag}
            />
          </div>
        )
      )}

      {loading ? (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-[85vw]">
          {Array.from({ length: 6 }).map((_, index) => (
            <OutfitLoadingCard key={index} />
          ))}
        </div>
      ) : filteredOutfits.length === 0 ? (
        <p className="flex justify-center items-center col-span-3 w-full text-muted text-xl lg:text-3xl text-center">
          No Outfit found.
        </p>
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-35">
          {filteredOutfits.map((outfit: Outfit) => (
            <OutfitCard key={outfit.outfitId} outfit={outfit} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Outfits;

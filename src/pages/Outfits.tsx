import { OutfitCard, OutfitLoadingCard } from "@/components/OutfitItemCard";
import useOutfits from "@/hook/useOutfit";
import type { Outfit } from "@/types/outfits_types";
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useAuth } from "react-oidc-context";

function Outfits() {
  const auth = useAuth();
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const { loading, result, fetchOutfits } = useOutfits();
  const [tags, setTags] = useState<string[] | null>(null);
  const [filteredOutfits, setFilteredOutfits] = useState<Outfit[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    fetchOutfits();
  }, [auth.user?.access_token]);

  useEffect(() => {
    if (result.data && result.data.length > 0) {
      const uniqueTags = GetUniqueClothingTags(result.data);
      setFilteredOutfits(result.data);
      setTags(["All", ...uniqueTags]);
    } else {
      setFilteredOutfits([]);
      setTags(null);
    }
  }, [result.data]);

  const GetUniqueClothingTags = (OutfitDetailData: Outfit[]) => {
    const allTags: string[] = [];
    OutfitDetailData.forEach((outfit) => {
      outfit.clothes.forEach((clothes) => {
        const upperCaseTags = clothes.tags.map(
          (tag) => tag.split("")[0].toUpperCase() + tag.slice(1).toLowerCase()
        );
        allTags.push(...upperCaseTags);
      });
    });
    return Array.from(new Set(allTags));
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);

    if (tag === "All") {
      setFilteredOutfits(result.data);
    } else {
      setFilteredOutfits(
        result.data.filter((outfit) =>
          outfit.clothes.some((clothes) =>
            clothes.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
          )
        )
      );
    }
  };

  return (
    <main className="flex flex-col items-center bg-bg py-8 pb-20 min-h-[calc(100vh-120px)]">
      <h1 className="mb-6 w-full font-bold text-title text-3xl text-center">
        Your Outfits
      </h1>
      {tags && (
        <div className="relative flex justify-center items-center mb-6">
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
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {filteredOutfits.map((outfit: Outfit) => (
            <OutfitCard key={outfit.outfitId} outfit={outfit} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Outfits;

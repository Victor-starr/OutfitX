import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface TagsFilterProps {
  tags: string[];
  tagsContainerRef: React.RefObject<HTMLDivElement | null>;
  handleTagClick: (tag: string) => void;
  selectedTag: string;
  centered?: boolean;
}

export default function TagsFilter({
  tags,
  tagsContainerRef,
  handleTagClick,
  selectedTag,
  centered,
}: TagsFilterProps) {
  const hasScroll = tags.length > 5;

  return (
    <div className="relative flex justify-center items-center my-4 w-full">
      {/* Left Arrow */}
      {hasScroll && (
        <FaArrowAltCircleLeft
          className="left-0 z-10 absolute text-muted hover:text-title cursor-pointer"
          size={30}
          onClick={() => {
            if (tagsContainerRef.current) {
              tagsContainerRef.current.scrollBy({
                left: -150,
                behavior: "smooth",
              });
            }
          }}
        />
      )}

      {/* Tags Scrollable Container */}
      <div
        ref={tagsContainerRef}
        className={`flex gap-2 px-5 py-2 ${
          centered ? "justify-center" : ""
        } items-center w-[90%] min-h-12 scroll-smooth
          ${
            hasScroll ? "overflow-x-auto scrollbar-thin-gray" : "justify-center"
          } 
        `}
      >
        {tags.map((tag) => (
          <p
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`text-center px-4 py-2 mb-1 text-md whitespace-nowrap cursor-pointer rounded-2xl transition-colors
          ${
            selectedTag === tag
              ? "bg-title text-onPrimary"
              : "hover:bg-primary text-title"
          }`}
          >
            {tag}
          </p>
        ))}
      </div>

      {/* Right Arrow */}
      {hasScroll && (
        <FaArrowAltCircleRight
          className="right-0 z-10 absolute text-muted hover:text-title cursor-pointer"
          size={30}
          onClick={() => {
            if (tagsContainerRef.current) {
              tagsContainerRef.current.scrollBy({
                left: 150,
                behavior: "smooth",
              });
            }
          }}
        />
      )}
    </div>
  );
}

export function LoadingTagsFilter() {
  return (
    <div className="flex justify-start gap-5 my-10 px-2 w-[85%]">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="flex-1 bg-muted rounded-2xl w-20 h-7 animate-pulse"
        ></span>
      ))}
    </div>
  );
}

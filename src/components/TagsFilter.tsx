import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface TagsFilterProps {
  tags: string[];
  tagsContainerRef: React.RefObject<HTMLDivElement | null>;
  handleTagClick: (tag: string) => void;
  selectedTag: string;
}
function TagsFilter({
  tags,
  tagsContainerRef,
  handleTagClick,
  selectedTag,
}: TagsFilterProps) {
  return (
    <>
      {tags.length > 5 && (
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
      )}

      <div
        ref={tagsContainerRef}
        className={`flex gap-2 px-2 max-w-[85%] ${
          tags.length > 5
            ? "overflow-x-auto scrollbar-thin-gray"
            : "justify-center"
        }`}
        style={{
          scrollBehavior: "smooth",
          width: "100%",
        }}
      >
        {tags.map((tag) => (
          <p
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`flex-1 min-w-[110px] max-w-[180px] text-center px-4 py-2 mb-2 text-md whitespace-nowrap cursor-pointer rounded-2xl transition-colors
                    ${
                      selectedTag === tag
                        ? "bg-title text-onPrimary"
                        : "hover:bg-primary text-title text-onPrimary"
                    }`}
            style={{
              flexBasis: `calc(100% / ${tags.length < 5 ? tags.length : 5})`,
            }}
          >
            {tag}
          </p>
        ))}
      </div>

      {tags.length > 5 && (
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
      )}
    </>
  );
}

export default TagsFilter;

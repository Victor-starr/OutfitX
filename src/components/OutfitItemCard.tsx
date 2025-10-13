import type { Outfit } from "@/types/outfits_types";
import { useNavigate } from "react-router";
export const OutfitLoadingCard = () => {
  return (
    <article className="flex flex-col bg-card shadow-md hover:shadow-lg p-4 rounded-2xl transition-shadow duration-300">
      <div className="bg-surface rounded-2xl w-full h-[200px] animate-pulse"></div>

      <span className="bg-muted mt-4 mb-2 rounded w-3/4 h-6 animate-pulse"></span>

      <span className="bg-muted rounded w-2/3 h-4 animate-pulse"></span>
    </article>
  );
};

export const OutfitCard = ({ outfit }: { outfit: Outfit }) => {
  const navigate = useNavigate();
  return (
    <article className="flex flex-col bg-card shadow-md hover:shadow-lg p-4 rounded-2xl transition-shadow duration-300">
      <div
        className="relative flex flex-row gap-2 bg-surface mx-auto p-2 rounded-2xl h-[200px] hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        onClick={() => navigate(`/outfits/${outfit.outfitId}`)}
      >
        <div className="flex flex-row flex-3 gap-1">
          <img
            className="flex-1 rounded w-[50%] h-full object-cover"
            src={outfit.clothes.Tops?.imageURL}
            alt={outfit.clothes.Tops?.name}
          />
          <img
            className="flex-1 rounded w-[50%] h-full object-cover"
            src={outfit.clothes.Outerwear?.imageURL}
            alt={outfit.clothes.Outerwear?.name}
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <img
            className="rounded w-full h-[65%] object-cover"
            src={outfit.clothes.Bottoms?.imageURL}
            alt={outfit.clothes.Bottoms?.name}
          />
          <img
            className="flex-1 rounded w-full h-[35%] object-cover"
            src={outfit.clothes.Feet?.imageURL}
            alt={outfit.clothes.Feet?.name}
          />
        </div>
        <div className="bottom-0 left-0 absolute flex flex-row gap-5 p-1 w-1/2 h-25">
          <img
            className="rounded w-[45%] h-full object-cover"
            src={outfit.clothes.Head?.imageURL}
            alt={outfit.clothes.Head?.name}
          />
          <img
            className="rounded w-[45%] h-full object-cover"
            src={outfit.clothes.Accessories?.imageURL}
            alt={outfit.clothes.Accessories?.name}
          />
        </div>
      </div>

      <h2 className="mt-2 font-semibold text-title text-lg">{outfit.name}</h2>
      {outfit.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {outfit.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-secondary px-2 py-1 rounded text-title text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

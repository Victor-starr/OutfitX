import type { Outfit } from "@/types/outfits_types";
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
  return (
    <article className="flex flex-col bg-card shadow-md hover:shadow-lg p-4 rounded-2xl transition-shadow duration-300">
      <div className="relative flex flex-row gap-2 bg-surface mx-auto p-2 rounded-2xl h-[200px]">
        <div className="flex flex-row flex-3 gap-1">
          <img
            className="flex-1 rounded w-[50%] h-full object-cover"
            src={outfit.clothes[0].imageURL}
            alt={outfit.clothes[0].name}
          />
          <img
            className="flex-1 rounded w-[50%] h-full object-cover"
            src={outfit.clothes[1].imageURL}
            alt={outfit.clothes[1].name}
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <img
            className="rounded w-full h-[65%] object-cover"
            src={outfit.clothes[2].imageURL}
            alt={outfit.clothes[2].name}
          />
          <img
            className="flex-1 rounded w-full h-[35%] object-cover"
            src={outfit.clothes[3].imageURL}
            alt={outfit.clothes[3].name}
          />
        </div>
        <div className="bottom-0 left-0 absolute flex flex-row gap-5 p-1 w-1/2 h-25">
          <img
            className="rounded w-[45%] h-full object-cover"
            src={outfit.clothes[4].imageURL}
            alt={outfit.clothes[4].name}
          />
          <img
            className="rounded w-[45%] h-full object-cover"
            src={outfit.clothes[5].imageURL}
            alt={outfit.clothes[5].name}
          />
        </div>
      </div>

      <h2 className="mt-2 font-semibold text-title text-lg">{outfit.name}</h2>
      <p className="mt-1 text-muted text-sm">{outfit.description}</p>
    </article>
  );
};

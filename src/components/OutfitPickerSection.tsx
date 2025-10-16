import { TbChefHat, TbJacket, TbShoe } from "react-icons/tb";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { FiWatch } from "react-icons/fi";
import Human from "@/assets/human.svg";
import type { OutfitSections } from "@/types/outfits_types";

interface OutfitPickerSectionProps {
  handleSelectCategory: (category: string) => void;
  outfitSections: OutfitSections;
  ClothesLoading: boolean;
}
const OutfitPickerSection = ({
  handleSelectCategory,
  outfitSections,
  ClothesLoading,
}: OutfitPickerSectionProps) => {
  return (
    <article className="relative flex justify-center items-center p-6 w-full md:w-[65%] lg:w-[35%] h-full">
      <img
        src={Human}
        alt="Human figure"
        className="z-1 w-full h-full object-cover"
      />
      <div className="top-0 left-0 z-2 absolute flex flex-col justify-center items-center gap-10 w-full h-full">
        <div className="flex flex-row gap-15 lg:ml-35">
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
        <div className="flex flex-row gap-15 lg:mr-35">
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
  );
};

export default OutfitPickerSection;

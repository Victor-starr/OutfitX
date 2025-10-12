import Human from "@/assets/human.svg";
import { useEffect, useState } from "react";
import { FiWatch } from "react-icons/fi";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { TbJacket, TbShoe } from "react-icons/tb";
import { TbChefHat } from "react-icons/tb";
import type { clothingCategories } from "@/types/outfits_types";
import useWardrobe from "@/hook/useWardrobe";

function CreateOutfit() {
  const [selectedCategory, setSelectedCategory] =
    useState<clothingCategories | null>(null);
  const { fetchData, result, loading } = useWardrobe();

  useEffect(() => {
    fetchData();
  }, [result.data.length]);

  const handleSelectCategory = (category: clothingCategories) => {
    setSelectedCategory(category);
  };
  return (
    <main className="relative flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Create Outfit
      </h1>
      <section className="flex flex-row justify-center items-center gap-15 px-10 py-5 rounded-2xl w-[90%] h-screen">
        <article className="relative flex justify-center items-center p-6 w-[35%] h-full">
          <img src={Human} alt="Human figure" className="z-1 w-full h-full" />
          <div className="top-0 left-0 z-2 absolute flex flex-col justify-center items-center gap-10 w-full h-full">
            <div className="flex flex-row gap-15 ml-35">
              <button
                onClick={() => handleSelectCategory("Head")}
                className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : (
                  <TbChefHat color="white" size={30} />
                )}
              </button>
              <button
                onClick={() => handleSelectCategory("Accessories")}
                className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : (
                  <FiWatch color="white" size={30} />
                )}
              </button>
            </div>
            <div className="flex flex-row gap-15 mr-35">
              <button
                onClick={() => handleSelectCategory("Outerwear")}
                className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : (
                  <TbJacket color="white" size={30} />
                )}
              </button>
              <button
                onClick={() => handleSelectCategory("Tops")}
                className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl"
              >
                {loading ? (
                  <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
                ) : (
                  <IoShirtOutline color="white" size={30} />
                )}
              </button>
            </div>
            <button
              onClick={() => handleSelectCategory("Bottoms")}
              className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl"
            >
              {loading ? (
                <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
              ) : (
                <PiPants color="white" size={30} />
              )}
            </button>
            <button
              onClick={() => handleSelectCategory("Feet")}
              className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl"
            >
              {loading ? (
                <div className="border-white border-b-2 rounded-full w-8 h-8 animate-spin"></div>
              ) : (
                <TbShoe color="white" size={30} />
              )}
            </button>
          </div>
        </article>
        {selectedCategory && (
          <section className="flex flex-1 bg-surface rounded-2xl h-full"></section>
        )}
      </section>
    </main>
  );
}

export default CreateOutfit;

import Human from "@/assets/human.svg";
import { FiWatch } from "react-icons/fi";
import { IoShirtOutline } from "react-icons/io5";
import { PiPants } from "react-icons/pi";
import { TbJacket, TbShoe } from "react-icons/tb";
import { TbChefHat } from "react-icons/tb";

function CreateOutfit() {
  return (
    <main className="relative flex flex-col items-center bg-bg py-8 h-[85vh] overflow-y-auto">
      <h1 className="mb-6 font-bold text-title text-2xl md:text-3xl lg:text-4xl text-center">
        Create Outfit
      </h1>
      <section className="flex flex-row justify-center items-center px-10 py-5 rounded-2xl w-[90%] h-screen">
        <article className="relative flex justify-center items-center p-6 w-[35%] h-full">
          <img src={Human} alt="Human figure" className="z-1 w-full h-full" />
          <div className="top-0 left-0 z-2 absolute flex flex-col justify-center items-center gap-10 w-full h-full">
            <div className="flex flex-row gap-15 ml-35">
              <button className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl">
                <TbChefHat color="white" size={30} />
              </button>
              <button className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl">
                <FiWatch color="white" size={30} />
              </button>
            </div>
            <div className="flex flex-row gap-15 mr-35">
              <button className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl">
                <TbJacket color="white" size={30} />
              </button>
              <button className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl">
                <IoShirtOutline color="white" size={30} />
              </button>
            </div>
            <button className="bg-white/45 px-6 py-10 border-2 border-surface border-dashed rounded-2xl">
              <PiPants color="white" size={30} />
            </button>
            <button className="bg-white/45 p-6 border-2 border-surface border-dashed rounded-2xl">
              <TbShoe color="white" size={30} />
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default CreateOutfit;

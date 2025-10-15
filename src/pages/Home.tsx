import Hero from "@/components/Hero";
import { TbHanger, TbTagsFilled } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import aboutImage from "@/assets/about-outfitx.jpg";
import FeedBackForm from "@/components/FeedBackForm";

const benefitsList = [
  {
    icon: <TbHanger size={64} className="text-primary" />,
    title: "Store Clothes & Outfits",
    description:
      "Easily save your clothes and create outfits. Keep everything organized in one place with our intuitive wardrobe management system.",
  },
  {
    icon: <TbTagsFilled size={64} className="text-primary" />,
    title: "Custom Tags & Filters",
    description:
      "Add tags like “work,” “casual,” or “winter” to quickly filter clothes and outfits.",
  },
  {
    icon: <FaClipboardList size={64} className="text-primary" />,
    title: "Outfit Planner & Events",
    description:
      "Plan your outfits ahead of time so you always know what to wear. Perfect for special events and daily coordination.",
  },
];

export default function Home() {
  return (
    <main className="top-0 relative w-screen h-screen">
      <Hero
        height="h-[85vh]"
        title="Outfit X"
        subtitle=" OutfitX helps you organize your clothes, create and customize outfits, and manage your wardrobe in one simple app."
        firstButtonText="Wardrobe"
        firstButtonLink="/wardrobe"
        secondButtonText="Outfits"
        secondButtonLink="/outfits"
      />
      <section className="flex lg:flex-row flex-col justify-center lg:justify-between items-center gap-8 lg:gap-12 bg-surface px-4 md:px-8 lg:px-16 py-16 lg:py-20 w-full">
        <div className="w-full lg:w-2/5 max-w-2xl lg:text-left text-center">
          <h2 className="mb-6 font-bold text-title text-3xl md:text-4xl lg:text-5xl">
            About OutfitX
          </h2>
          <p className="text-muted text-lg md:text-xl lg:text-2xl leading-relaxed">
            OutfitX is a simple wardrobe management app that lets you store and
            organize your clothes digitally. You can create and customize
            outfits, plan what to wear, and keep your style organized in one
            place.
          </p>
        </div>
        <div className="w-full lg:w-3/5 max-w-2xl">
          <img
            className="shadow-lg hover:shadow-xl rounded-2xl w-full h-auto max-h-96 lg:max-h-full object-cover transition-shadow duration-300"
            src={aboutImage}
            alt="About OutfitX"
          />
        </div>
      </section>
      <section className="flex flex-col items-center bg-bg px-4 md:px-8 py-16 md:py-20 w-full">
        <h1 className="mb-12 md:mb-16 font-bold text-title text-3xl md:text-4xl text-center">
          Why OutfitX?
        </h1>
        <div className="flex flex-wrap justify-center items-stretch gap-6 md:gap-8 w-full max-w-7xl">
          {benefitsList.map((benefit, index) => (
            <article
              key={index}
              className="flex flex-col sm:flex-1 items-center bg-card hover:shadow-lg p-6 md:p-8 rounded-2xl w-full sm:min-w-80 sm:max-w-sm text-center hover:scale-105 transition-all duration-300"
            >
              <div className="bg-primary/10 mb-4 md:mb-6 p-4 md:p-6 rounded-full">
                {benefit.icon}
              </div>
              <h2 className="mb-3 md:mb-4 font-semibold text-title text-lg md:text-xl">
                {benefit.title}
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-center items-center bg-surface px-8 py-15 w-full">
        <h2 className="mb-8 md:mb-12 font-bold text-title text-3xl md:text-4xl text-center">
          Feedback
        </h2>
        <FeedBackForm />
      </section>
    </main>
  );
}

import Button from "@/components/Button";
import aboutImage from "@/assets/about-outfitx.jpg";
import { TbHanger, TbTagsFilled } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";

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
      <header className="relative flex flex-col justify-center items-center px-4 md:px-8 lg:px-12 w-full h-[85vh]">
        <img
          src="/img/herobanner.jpg"
          alt="Hero Banner"
          loading="lazy"
          className="top-0 left-0 z-0 absolute w-full h-full object-cover object-top"
        />
        <div className="top-0 left-0 absolute bg-black opacity-60 w-full h-full"></div>
        <div className="z-10 flex flex-col items-center mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-bold text-title text-4xl md:text-5xl lg:text-6xl">
            Outfit <span className="text-primary">X</span>
          </h1>
          <p className="mb-8 max-w-2xl text-muted text-lg md:text-xl lg:text-2xl leading-relaxed">
            OutfitX helps you organize your clothes, create and customize
            outfits, and manage your wardrobe in one simple app.
          </p>
          <div className="flex sm:flex-row flex-col justify-center items-center gap-4 md:gap-6 w-full max-w-md">
            <Button
              type="v1"
              color="secondary"
              size="lg"
              className="sm:flex-1 px-8 py-3 w-full font-semibold"
            >
              Wardrobe
            </Button>
            <Button
              type="v2"
              color="secondary"
              size="lg"
              className="sm:flex-1 px-8 py-3 w-full font-semibold"
            >
              Outfit
            </Button>
          </div>
        </div>
      </header>
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
        <h2 className="mb-12 md:mb-16 font-bold text-title text-3xl md:text-4xl text-center">
          FeedBack
        </h2>
        <form className="space-y-6 bg-card p-8 rounded-2xl w-full max-w-lg">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-title text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors placeholder-muted"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-title text-lg"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors placeholder-muted"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-title text-lg"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors resize-none placeholder-muted"
              placeholder="Enter your message"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="v1"
              color="secondary"
              size="lg"
              className="px-12 py-3"
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

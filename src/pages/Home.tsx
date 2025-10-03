import Button from "../components/Button";

export default function Home() {
  return (
    <div className="top-0 relative w-screen h-screen">
      {/* Header */}
      <header className="relative flex flex-col justify-center items-center px-5 w-screen h-100 hero-banner">
        <div className="top-0 left-0 absolute bg-black opacity-40 w-full h-full"></div>
        <h1 className="z-2 mb-4 text-title text-5xl text-center">
          Outfit <span className="text-primary">X</span>
        </h1>
        <p className="z-2 mb-6 max-w-xl text-muted text-2xl text-center">
          OutfitX helps you organize your clothes, create and customize outfits,
          and manage your wardrobe in one simple app.
        </p>
        <div className="z-2 flex justify-center items-center gap-10 mt-5 w-[50%] lg:w-[400px]">
          <Button type="v1" color="secondary" size="lg" className="flex-1">
            Wardrobe
          </Button>
          <Button type="v2" color="secondary" size="lg" className="flex-1">
            Outfit
          </Button>
        </div>
      </header>
      {/* About */}
      <section></section>
      {/* Why */}
      <section></section>
      {/* Feedback */}
      <section></section>
    </div>
  );
}

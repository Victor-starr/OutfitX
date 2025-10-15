import { LinkButton } from "@/components/Button";
interface HeroProps {
  height?: string;
  title: string;
  subtitle: string;
  firstButtonText?: string;
  secondButtonText?: string;
  firstButtonLink?: string;
  secondButtonLink?: string;
}
function Hero({
  height,
  title,
  subtitle,
  firstButtonText,
  secondButtonText,
  firstButtonLink,
  secondButtonLink,
}: HeroProps) {
  return (
    <header
      className={`relative flex flex-col justify-center items-center px-4 md:px-8 lg:px-12 w-full ${
        height || "h-[85vh]"
      }`}
    >
      <img
        src="/img/herobanner.jpg"
        alt="Hero Banner"
        loading="lazy"
        className="top-0 left-0 z-0 absolute w-full h-full object-cover object-top"
      />
      <div className="top-0 left-0 absolute bg-black opacity-60 w-full h-full"></div>
      <div className="z-10 flex flex-col items-center mx-auto max-w-4xl text-center">
        <h1 className="mb-6 font-bold text-title text-4xl md:text-5xl lg:text-6xl">
          {title.split(" ").map((word, index) => {
            if (index === 1) {
              return (
                <span key={index} className="text-primary">
                  {word}{" "}
                </span>
              );
            }
            return word + " ";
          })}
        </h1>
        <p className="mb-8 max-w-2xl text-muted text-lg md:text-xl lg:text-2xl leading-relaxed">
          {subtitle}
        </p>
        <div className="flex sm:flex-row flex-col justify-center items-center gap-4 md:gap-6 w-full max-w-md sm:max-w-2xl">
          <>
            {firstButtonText && firstButtonLink && (
              <LinkButton
                version="v1"
                to={firstButtonLink}
                bgColor="secondary"
                textColor="title"
                size="xl"
                className="px-6 sm:px-8 py-4 sm:py-3 w-full sm:w-auto min-w-[200px] font-semibold whitespace-nowrap"
              >
                {firstButtonText}
              </LinkButton>
            )}
            {secondButtonText && secondButtonLink && (
              <LinkButton
                version="v2"
                to={secondButtonLink}
                bgColor="secondary"
                textColor="secondary"
                size="xl"
                className="px-6 sm:px-8 py-4 sm:py-3 w-full sm:w-auto min-w-[200px] font-semibold whitespace-nowrap"
              >
                {secondButtonText}
              </LinkButton>
            )}
          </>
        </div>
      </div>
    </header>
  );
}

export default Hero;

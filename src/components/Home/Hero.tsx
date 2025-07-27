import bgHero from "../../assets/bg-hero.png";
import Car from "../../assets/car.png";

const Hero = () => {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Find, book and rent a car{" "}
            <strong className="text-sky-600">Easily</strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Get a car wherever and whenever you need it with your IOS and
            Android device.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <a
              href={"#deals"}
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="relative hidden lg:block lg:overflow-hidden">
          <div className="absolute top-1/4 z-10">
            <img src={Car} alt="" />
          </div>
          <div className="">
            <img src={bgHero} alt="" className="opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

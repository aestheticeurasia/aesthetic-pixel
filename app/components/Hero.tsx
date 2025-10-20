import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="h-screen bg-[url('/heroBg.png')] md:bg-[url('/heroBg.png')] bg-cover bg-center flex flex-col justify-center pl-8 md:pl-[138px]">
      <div className="md:mt-[250]">
        <span className="text-red-500">Ecommerce Photography</span>
        <h1 className="text-white text-6xl justify-start font-bold">
          Creative Imagery With
          <br />
          Flawless Photography
        </h1>
        <p className="text-white max-w-lg mt-6">
          Our expert team blends precise product photography with innovative
          retouching and exact color matching, delivering images that exceed
          your expectations.
        </p>
        <button className="mt-8 bg-red-500 text-white py-4 px-6 font-bold hover:bg-red-600 transition-colors rounded-md cursor-pointer">
          Get Started <ArrowRight className="inline-block ml-2" />
        </button>
      </div>
    </section>
  );
}

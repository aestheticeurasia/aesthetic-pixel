import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen bg-[url('/heroBg.png')] md:bg-[url('/heroBg.png')] bg-cover bg-center flex flex-col items-center text-center justify-center pb-10 md:pb-0">
      <div className="lg:mt-[250px]">
        <span className="text-red-500 text-sm text-center">
          Ecommerce Photography
        </span>
        <h1 className="text-white text-4xl md:text-6xl font-bold mt-2">
          Creative Imagery With
          <br />
          Flawless Photography
        </h1>
        <p className="text-white max-w-md mt-4 text-md mx-auto text-center">
          Our expert team blends precise product photography with innovative
          retouching and exact color matching, delivering images that exceed
          your expectations.
        </p>
        <Link href="/book-a-slot" target="_blank" rel="noopener noreferrer">
          <button className="mt-6 md:mt-8 bg-red-500 text-white py-3 px-5 md:py-4 md:px-6 font-bold hover:bg-red-600 transition-colors rounded-md cursor-pointer text-sm md:text-base">
            Get Started <ArrowRight className="inline-block ml-2" size={18} />
          </button>
        </Link>
      </div>
    </section>
  );
}

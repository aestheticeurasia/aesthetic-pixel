"use client";
import {
  ArrowRight,
  Camera,
  ClipboardList,
  ShoppingCartIcon,
  Sparkles,
} from "lucide-react";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const workSteps = [
  {
    step: "01",
    title: "Your Order",
    description:
      "Submit requirements and ship your products securely to our studio.",
    icon: ShoppingCartIcon,
  },
  {
    step: "02",
    title: "Pre Production",
    description:
      "We prep, steam, style items and plan the perfect lighting setup",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Photoshoot",
    description: "Expert capture using high-end commercial RED equipment.",
    icon: Camera,
  },
  {
    step: "04",
    title: "Post Production",
    description:
      "Retouching, color grading, and final delivery via dark cloud.",
    icon: Sparkles,
  },
];

export default function Banner() {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col lg:flex-row min-h-screen pt-[120px] px-6 md:px-12 lg:px-20 gap-8 items-stretch justify-center lg:px-[160px]">
        <div className="flex-1 bg-[url('/layoutComponents/redishBlur.svg')] bg-no-repeat bg-bottom-right p-8 lg:p-12 border border-[#222223] rounded-3xl flex flex-col justify-center">
          <div className="max-w-xl">
            <Badge
              variant="outline"
              className="rounded-xl text-red-500 border-red-900 font-bold w-fit mb-6"
            >
              <GoDotFill className="mr-2" /> NEW STUDIO OPENING
            </Badge>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Scalable Product
              <span className="text-[#f00004]"> Photography for</span> Brands
            </h1>

            <p className="text-[#7e7c83] text-lg mb-10">
              APS delivers high-converting product photography for product
              display pages, landing pages and retail partners. Plus: all the
              creative direction, styling and merchandising expertise to ensure
              your creative converts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 sm:flex-none bg-red-600 rounded-full text-white border-none px-5 lg:px-8 py-3 lg:py-6 hover:bg-red-500 cursor-pointer text-base">
                <span className="flex items-center justify-center gap-2 w-full">
                  Talk to an Expert
                  <ArrowRight size={20} />
                </span>
              </Button>

              <Button className="flex-1 sm:flex-none px-5 lg:px-8 py-3 lg:py-6 rounded-full hover:bg-gray-800 cursor-pointer text-white border border-gray-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 min-h-[220px] sm:min-h-[280px] lg:flex-1">
            <div
              className="relative group overflow-hidden rounded-2xl min-h-[160px] sm:min-h-[200px]
        border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
            >
              <Image
                src="/shoes.png"
                alt="Footwear"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md">
                Footwear
              </Badge>
            </div>

            <div
              className="relative group overflow-hidden rounded-2xl min-h-[160px] sm:min-h-[200px]
        border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
            >
              <Image
                src="/model.png"
                alt="Apparel"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md">
                Apparel
              </Badge>
            </div>
          </div>

          <div
            className="relative flex-1 min-h-[260px] group overflow-hidden rounded-2xl
      border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
          >
            <Image
              src="/fur-life.png"
              alt="Lifestyle"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-red-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-1">
                LIFESTYLE
              </h3>
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Modern Living Collection
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Work Steps */}
      <section
        className="
    mt-[32px]
    px-4 sm:px-18 
    bg-[url('/layoutComponents/redishBlur-top.svg')]
    bg-no-repeat
    bg-right-bottom
    lg:px-[160px]
  "
      >
        <div className="py-8">
          <h1 className="text-4xl font-semibold text-white">
            Simple Steps of Work
          </h1>
          <p className="text-muted-foreground">
            From concept to final delivery in 4 days
          </p>
        </div>

        <div
          className="
      mx-auto
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6
    "
        >
          {workSteps.map((step, index) => (
            <Card
              key={index}
              className="
          group
          w-full
          lg:aspect-square
          flex flex-col
          justify-between

          border border-[#222223]
          rounded-3xl
          p-6 md:p-8
          bg-transparent

          transition-colors duration-300
          hover:border-[#7d0508]
        "
            >
              <div className="flex flex-col h-full">
                <h1
                  className="
              text-6xl md:text-7xl font-extrabold
              text-muted-foreground/30
              text-end
              transition-colors duration-300
              group-hover:text-[#7d0508]
            "
                >
                  {step.step}
                </h1>

                <div className="mt-auto">
                  <div className="mb-4 inline-block">
                    <step.icon
                      className="
                  p-2
                  text-[#A1A1AA]
                  bg-[#27272A80]
                  rounded-lg
                  transition-all duration-300
                  group-hover:text-white
                  group-hover:bg-red-600
                "
                      size={48}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl text-white mb-2">
                    {step.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

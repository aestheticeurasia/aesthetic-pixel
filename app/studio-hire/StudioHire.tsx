import React from "react";
import {
  Camera,
  Layers3,
  Briefcase,
  Lightbulb,
  Zap,
  Package,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import RentForm from "../components/RentForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GoDotFill } from "react-icons/go";

const features = [
  {
    icon: Layers3,
    title: "Backdrop",
    type: "video",
    tag: "Backdrop",
    desc: "Lifestyle shoots that connect your products with real-life moments.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761120025/Backdrop_wzq4fv.mp4",
  },
  {
    icon: Briefcase,
    title: "Changing-Room",
    type: "video",
    tag: "Changing Room",
    desc: "Headshots, facility photography and editorial assets for comms.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761213010/Studio_changing_room_vxdimj.mp4",
  },
  {
    icon: Camera,
    title: "Lighting Setup",
    type: "video",
    tag: "Lighting Setup",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761120027/Lighting-Setup_r6kgt8.mp4",
  },
  {
    icon: Lightbulb,
    title: "Mackup Room",
    type: "video",
    tag: "Mackup Room",
    desc: "Concept, styling and art direction to fit your brand voice.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761120037/Mackup-Room_aocn8c.mp4",
  },
  {
    icon: Package,
    title: "Additional Colored-Backdrop",
    type: "image",
    tag: "Additional Colored-Backdrop",
    desc: "Optimized product photos sized and edited for online listings and ads.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/image/upload/v1761120010/Additional-Colored-Backdrop_wx2dgb.jpg",
  },
  {
    icon: Zap,
    title: "Studio Propos",
    type: "image",
    tag: "Studio Propos",
    desc: "Clear timelines and reliable delivery without compromising quality.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/image/upload/v1761120038/Studio-Propos_mt6v4d.jpg",
  },
];

export default function StudioHire() {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col lg:flex-row pt-10 px-6 md:px-12 gap-8 items-stretch justify-center lg:px-[160px]">
        <div className="flex-1 bg-[url('/layoutComponents/redishBlur.svg')] bg-no-repeat bg-bottom-right p-5 border border-[#222223] rounded-3xl flex flex-col justify-center">
          <div>
            <Badge
              variant="outline"
              className="rounded-xl text-red-500 border-red-900 font-bold w-fit mb-6"
            >
              <GoDotFill className="mr-2" /> AVAILABLE FOR BOOKING
            </Badge>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              The perfect studio for
              <span className="text-[#f76c6c]"> your creative vision</span>
            </h1>

            <p className="text-[#7e7c83] text-lg mb-10">
              Rent our well-equipped, flexible studio space designed for swift
              product shots, fashion editorials, and high-end photographic
              projects.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div
                className="lg:col-span-8 relative group overflow-hidden rounded-2xl min-h-[260px] lg:min-h-full
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

              <div className="lg:col-span-4 grid grid-cols-1 gap-4">
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
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <RentForm />
        </div>
      </section>
    </div>
  );
}

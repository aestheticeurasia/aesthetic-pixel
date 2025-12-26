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
    img: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea",
  },
  {
    icon: Briefcase,
    title: "Changing-Room",
    type: "video",
    tag: "Changing Room",
    desc: "Headshots, facility photography and editorial assets for comms.",
    img: "https://images.unsplash.com/photo-1736761814010-1e16c2fabee6",
  },
  {
    icon: Camera,
    title: "Lighting Setup",
    type: "video",
    tag: "Lighting Setup",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  },
  {
    icon: Lightbulb,
    title: "Mackup Room",
    type: "video",
    tag: "Mackup Room",
    desc: "Concept, styling and art direction to fit your brand voice.",
    img: "https://images.unsplash.com/photo-1646020276968-0d408da1124c",
  },
  {
    icon: Package,
    title: "Additional Colored-Backdrop",
    type: "image",
    tag: "Colored-Backdrop",
    desc: "Optimized product photos sized and edited for online listings and ads.",
    img: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea",
  },
  {
    icon: Zap,
    title: "Studio Propos",
    type: "image",
    tag: "Studio Propos",
    desc: "Clear timelines and reliable delivery without compromising quality.",
    img: "https://images.unsplash.com/photo-1646020276968-0d408da1124c",
  },
];

const faqs = [
  {
    id: "1",
    question: "What industries do you specialize in?",
    answer:
      "We have experience across various industries including fashion, tech, lifestyle, and more. Our team adapts to the unique needs of each sector.",
  },
  {
    id: "2",
    question: "What is your typical project turnaround time?",
    answer:
      "Our typical project turnaround time ranges from 2 to 4 weeks, depending on the complexity and scope of the project. We prioritize quality and timely delivery.",
  },
  {
    id: "3",
    question: "What is your revision policy?",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
  },
  {
    id: "4",
    question: "What is your revision policy?",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
  },
  {
    id: "5",
    question: "What is your revision policy?",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
  },
  {
    id: "6",
    question: "What is your revision policy?",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
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

      {/* Studio Features */}
      <section className="px-6 md:px-12 py-15 lg:px-[320px] border-t-1 border-b-1 border-t-[#1c1c1c] border-b-[#1c1c1c] mt-20">
        <div>
          <div className="text-center">
            <h1 className="text-3xl font-bold f56565 text-[#f56565]">
              Studio Features
            </h1>
            <p className="text-muted-foreground mt-1">
              Everything included in your booking
            </p>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10 text-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="
      relative group border-[#261b1c] border-2 rounded-xl 
   overflow-hidden
      px-15 py-20
      cursor-pointer
      w-full h-auto
    "
              >
                <Image
                  src={`${feature.img}`}
                  alt={feature.tag}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/50" />

                <h1 className="relative z-10 text-2xl font-bold text-white">
                  {feature.tag}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-5 px-4 sm:px-8 lg:px-20 xl:px-[160px] bg-[url('/layoutComponents/3rdBlur.svg')] bg-no-repeat bg-right-top">
        <div className="lg:py-[48px] px-3 lg:px-[232px] pb-10 md:pb-0">
          <h1 className="text-white text-2xl lg:text-4xl font-bold text-center mb-[32px]">
            Frequently Asked Questions
          </h1>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-2 border-[#24191a] bg-[#0b0b0c] rounded-2xl mb-[12px] px-4 py-2"
                >
                  <AccordionTrigger className="text-white text-md lg:text-lg hover:no-underline underline-offset-0 cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}

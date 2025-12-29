"use client";
import BrandSlider from "@/app/components/BrandSlider";
import GoBackButton from "@/app/components/GoBackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Clock2,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

interface Services {
  title: string;
  tag: string;
  slug: string;
  desc: string;
  content: string;
  img: string;
  sampleImg?: string[];
}

interface Props {
  slug: string;
}

const featuredServices = [
  {
    title: "Free Collection & Delivery Across Bangladesh",
    desc: "Convenient, secure, and cost-effective transport",
    icon: Truck,
  },
  {
    title: "Quick Turnaround",
    desc: "Meeting tight deadlines without compromising on quality.",
    icon: Clock2,
  },
  {
    title: "100% Satisfaction Guaranteed",
    desc: "We’re not satisfied until you are",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Free Retouching",
    desc: "High-end retouching for flawless results",
    icon: Star,
  },
];

export default function ServiceDetails({ slug }: Props) {
  const [service, setService] = useState<Services | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Services[]>("/services.json");
        const found = data.find((s) => s.slug === slug) || null;
        setService(found);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!service) {
    return (
      <div className="container mx-auto">
        <div className="mt-10">
          <GoBackButton />
        </div>
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-semibold mt-6 text-gray-700 dark:text-gray-200">
            Service Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 px-3">
            The service you’re looking for doesn’t exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="pt-10 px-6 md:px-12 lg:px-[160px] animate-in fade-in slide-in-from-top-full duration-1000 delay-500">
        <div className="flex flex-col justify-center items-center">
          <Badge
            variant="outline"
            className="rounded-xl text-red-500 border-red-900 font-bold w-fit mb-6"
          >
            <GoDotFill className="mr-2" /> PREMIUM SERVICES
          </Badge>
          <h1 className="text-white text-6xl font-bold text-center">
            {(() => {
              const words = service?.title?.split(" ") || [];
              const lastWord = words.pop();

              return (
                <>
                  {words.join(" ")}
                  <br />
                  <span className="text-red-600">{lastWord}</span>
                </>
              );
            })()}
          </h1>

          <p className="text-muted-foreground mt-8 w-100 text-center">
            {service?.desc}
          </p>
          <div className="mt-10">
            <Button className="cursor-pointer px-15 py-6 bg-[#dc2626] border-[#e53535] rounded-3xl">
              Book a Shot <ArrowRight />
            </Button>
            <Button className="cursor-pointer px-10 py-5 bg-[#121212] border-[#2a2a2a] rounded-3xl">
              <a href="#work-sample"> View Samples</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pt-10 px-6 md:px-12 lg:px-[160px] animate-in fade-in slide-in-from-right-full duration-1000 delay-500">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={service.img}
            alt={service.title}
            width={1230}
            height={498}
            className="w-full rounded-md mt-10"
          />
        </div>
        <h1 className="text-3xl font-semibold text-white mt-9 text-center">
          The Art of Detail
        </h1>
        <p className="text-muted-foreground mt-4 text-center max-w-[90%] md:max-w-[800px] mx-auto">
          {service?.content}
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="lg:py-[80px] py-10 px-6 lg:px-[160px]">
        <div className="px-7 my-10 text-center lg:text-start">
          <h1 className="text-3xl font-semibold text-white mb-3">
            Why Choose Us
          </h1>
          <p className="text-muted-foreground">
            Premium service standards for every client
          </p>
        </div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="container mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group relative p-8 flex flex-col items-start border border-[#1e1e20] bg-[#0d0d0e] rounded-2xl transition-all duration-300 hover:border-red-700/50 hover:bg-[#121214] overflow-hidden"
                >
                  <div className="mb-6 p-4 rounded-lg bg-[#19191c] text-white transition-colors duration-300 group-hover:bg-red-700 group-hover:text-white">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-red-500">
                    {feature?.title}
                  </h3>
                  <p className="text-gray-400 mt-3 leading-relaxed text-sm lg:text-base">
                    {feature?.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-700 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Work Sample */}
      <section className="px-6 lg:px-[160px]" id="work-sample">
        <div className="px-7 mb-5">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Work Sample
          </h1>
          <p className="text-muted-foreground">
            Curated selection of our finest shots.
          </p>
        </div>
        <div className="px-5">
          {service.sampleImg && service.sampleImg.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 overflow-hidden rounded-lg">
                <Image
                  src={service.sampleImg[0]}
                  alt="Sample 1"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 grid-rows-2 gap-6">
                {service.sampleImg.slice(1, 5).map((imgUrl, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <Image
                      src={imgUrl}
                      alt={`Sample ${index + 2}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No samples available.</p>
          )}
        </div>
      </section>

      {/* Brand Slider */}
      <section className="px-6 lg:px-[160px] mt-20">
        <div className="border-t-[#4f1313] border-b-[#4f1313] border-t-2 border-b-2 bg-[#120b0b] py-15 rounded-xl">
          <h1 className="font-semibold text-[#dc2626] text-center mb-10 uppercase">
            Trusted by Global Brands
          </h1>
          <BrandSlider />
        </div>
      </section>

      {/* Free Trial Contact */}
      <section className="mt-20 px-4 sm:px-8 lg:px-20 xl:px-[160px] bg-transparent">
        <div className="relative lg:px-[279px] lg:py-[80px] px-10 py-15 border-[#221919] hover:border-red-900 rounded-3xl bg-[#0a0a0b] text-center overflow-hidden">
          <div
            className="
      absolute top-0 right-0
      w-[300px] h-[300px]
      bg-[url('/layoutComponents/qouteBlur-top.svg')]
      bg-no-repeat bg-contain
      pointer-events-none
      opacity-70
    "
          />

          <div
            className="
      absolute bottom-0 left-0
      w-[300px] h-[300px]
      bg-[url('/layoutComponents/qouteBlur.svg')]
      bg-no-repeat bg-contain
      pointer-events-none
      opacity-70
    "
          />
          <h1 className="lg:text-5xl text-3xl font-bold text-white">
            Get One Stop Digital <br className="lg:hidden" />
            Solutions <br className="lg:hidden" /> Under One Roof
          </h1>

          <h4 className="text-muted-foreground my-10 text-lg">
            Web Development, Creative Writing, Digital Marketing, Graphics &
            Video Editing.
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-10 mb-4 lg:mb-10">
            <Input
              type="email"
              placeholder="Enter your email"
              className="
          w-full sm:w-[360px]
          border-[#3f3f46]
          bg-[#070707]
          text-white
          placeholder:text-gray-500
          paceholder:text-center
          text-lg
          rounded-full
          px-7 py-7
          focus:border-red-600
          focus:ring-2 focus:ring-red-600/30
          transition-all
        "
            />

            <Button
              className="
          bg-white
          text-black
          text-md
          font-bold
          rounded-full
          px-8 py-7
          hover:bg-[#a70b1e]
          hover:text-white
          active:scale-[0.98]
          transition-all
          shadow-lg shadow-red-900/20
          cursor-pointer
        "
            >
              Start Free Trial
            </Button>
          </div>
          <h4 className="text-muted-foreground mt-10 text-lg">
            Call us Directly: <br className="lg:hidden" />
            <span className="font-bold text-red-800">+880 1711-205200</span>
          </h4>
        </div>
      </section>
    </div>
  );
}

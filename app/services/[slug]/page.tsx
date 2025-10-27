"use client";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { motion } from "framer-motion";
import { ChartNoAxesCombined, Clock2, Star, Truck } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface Services {
  title: string;
  tag: string;
  slug: string;
  desc: string;
  img: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

const brands = [
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
];

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

export default function ServiceDetails({ params }: Props) {
  const { slug } = use(params);
  const [service, setService] = useState<Services | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get<Services[]>("/services.json");
        const found = data.find((s) => s.slug === slug) || null;
        setService(found);
      } catch (err) {
        console.log(err);
      }
    };
    fetchService();
  }, [slug]);

  if (!service) return <p className="text-center mt-10">Services not found.</p>;

  return (
    <div className="container max-w-full">
      <section className="bg-[#f2f2f2] flex flex-col md:flex-row justify-between items-center md:py-20 px-4 md:px-15">
        <motion.div
          key={1}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 * 0.2, type: "spring" }}
          className="w-full md:max-w-1/2 px-4 md:px-10 mt-10 md:mt-0"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-center md:text-start leading-snug bg-gradient-to-tr from-gray-900 to-gray-400 bg-clip-text text-transparent">
            {service?.title}
          </h1>
          <p className="text-lg mt-6 md:mt-10 text-center md:text-start w-full md:max-w-3/4 mx-auto md:mx-0 text-gray-500">
            {service?.desc}
          </p>
        </motion.div>
        <motion.div
          key={2}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 * 0.2, type: "spring" }}
          className="w-full md:max-w-1/2 px-4 md:px-10 flex justify-center"
        >
          <Image
            src={service?.img}
            alt={service?.title}
            width={500}
            height={500}
            className="object-cover rounded-md shadow-lg w-full max-w-md md:max-w-full mt-10 md:mt-0"
          />
        </motion.div>
      </section>
      <section className="lg:py-[80px] py-10 px-6 bg-[#f8f7fa] dark:bg-black">
        <Marquee pauseOnHover={true} speed={90} direction="left">
          {brands.map((brand, index) => (
            <Image
              src={brand}
              alt={`Brand ${index + 1}`}
              key={index}
              width={199}
              height={133}
              className="w-[199px] h-[133px] object-contain"
            />
          ))}
        </Marquee>
      </section>
      <section className="lg:py-[80px] py-10 px-6">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="p-6 flex flex-col items-center text-center bg-[#eaeef4] rounded-sm shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <Icon className="w-10 h-10 mb-4 text-gray-800" />
                  <h1 className="text-xl font-semibold">{feature?.title}</h1>
                  <p className="text-gray-500 mt-2">{feature?.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

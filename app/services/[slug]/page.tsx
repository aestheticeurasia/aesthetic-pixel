"use client";
import BrandSlider from "@/app/components/BrandSlider";
import GoBackButton from "@/app/components/GoBackButton";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { motion } from "framer-motion";
import { ChartNoAxesCombined, Clock2, Star, Truck } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Services {
  title: string;
  tag: string;
  slug: string;
  desc: string;
  img: string;
  sampleImg?: string[];
}

interface Props {
  params: Promise<{ slug: string }>;
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

export default function ServiceDetails({ params }: Props) {
  const { slug } = use(params);
  const [service, setService] = useState<Services | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Services[]>("/services.json");
        const found = data.find((s) => s.slug === slug) || null;
        setService(found);
        setLoading(false);
      } catch (err) {
        console.log(err);
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
    <div className="container max-w-full">
      <section className="bg-[#f2f2f2] flex flex-col md:flex-row justify-between items-center md:py-20 px-4 md:px-15">
        <motion.div
          key={1}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 * 0.2, type: "spring" }}
          className="w-full md:max-w-1/2 px-4 md:px-10 mt-10 md:mt-0"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-center md:text-start leading-snug ">
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
      <section className="lg:py-[80px] px-6 pt-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-10 text-black text-center landing-page-title-font transition-all duration-300 hover:tracking-widest">
          Work{" "}
          <span className="text-red-600 landing-page-title-font">Samples</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {service?.sampleImg?.map((imgUrl, index) => (
            <div key={index}>
              <Image
                src={imgUrl}
                alt={`${service?.title || "Service image"} ${index + 1}`}
                width={300}
                height={200}
                className="object-cover  hover:scale-150 transition-transform duration-900 rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="lg:py-[80px] py-10 px-6 bg-[#f8f7fa] dark:bg-black">
        <BrandSlider />
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
                  className="p-6 flex flex-col items-center text-center bg-[#eaeef4] rounded-sm shadow-md hover:shadow-xl hover:text-red-700 transition-shadow duration-300"
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

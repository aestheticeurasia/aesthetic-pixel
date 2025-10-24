"use client";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Service {
  title: string;
  slug: string;
  desc: string;
  img: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetails({ params }: Props) {
  const { slug } = use(params);
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get<Service[]>("/services.json");
        const found = data.find((b) => b.slug === slug) || null;
        setService(found);
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [slug]);

  if (!service) return <p className="text-center mt-10">Services not found.</p>;

  return (
    <div className="container max-w-full min-h-screen">
      <section className="bg-[#f2f2f2] flex flex-col md:flex-row justify-between items-center md:py-20 px-4 md:px-15">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, type: "spring" }}
          className="w-full md:max-w-1/2 px-4 md:px-10 mt-10 md:mt-0"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-center md:text-start leading-snug bg-gradient-to-tr from-gray-900 to-gray-400 bg-clip-text text-transparent">
            {service.title}
          </h1>
          <p className="text-lg mt-6 md:mt-10 text-center md:text-start w-full md:max-w-3/4 mx-auto md:mx-0 text-gray-500">
            {service.desc}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, type: "spring" }}
          className="w-full md:max-w-1/2 px-4 md:px-10 flex justify-center"
        >
          <Image
            src={service.img}
            alt={service.title}
            width={500}
            height={500}
            className="object-cover rounded-md shadow-lg w-full max-w-md md:max-w-full mt-10 md:mt-0"
          />
        </motion.div>
      </section>
    </div>
  );
}
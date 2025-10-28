"use client";
import axios from "axios";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Services {
  title: string;
  tag: string;
  slug: string;
  desc: string;
  img: string;
}
export default function ServicesComponents() {
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(null);
  const [services, setServices] = useState<Services[]>([]);

  const getAllServices = async () => {
    try {
      const { data } = await axios.get("/services.json");
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((item, idx) => (
        <Link key={item.slug} href={`/services/${item.slug}`}>
          <div
            className="relative group overflow-hidden rounded-sm shadow-sm cursor-pointer"
            onClick={() =>
              setOpenFeatureIndex(openFeatureIndex === idx ? null : idx)
            }
          >
            <Image
              src={item.img}
              alt={item.title}
              width={600}
              height={400}
              className={`object-cover group-hover:scale-110 w-full h-70 transition-transform duration-700 ${
                openFeatureIndex === idx ? "scale-110" : ""
              }`}
            />

            <span className="absolute left-2 bottom-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {item.tag}
            </span>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
              <span className="text-white text-lg font-bold tracking-wide flex items-center hover:text-gray-300">
                View More <ArrowRightIcon className="inline-block" />
              </span>
            </div>

            <div
              className={`absolute inset-x-0 bottom-0 bg-black/70 text-white px-5 py-5 flex flex-col justify-center transition-all duration-500 ease-out ${
                openFeatureIndex === idx
                  ? "translate-y-[5%]"
                  : "translate-y-full"
              } group-hover:translate-y-[5%]`}
            >
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-200">{item.desc}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

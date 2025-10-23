"use client";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const features = [
  {
    title: "Product Photography",
    tag: "Product",
    desc: "Optimized product photos sized and edited for online listings and ads.",
    img: "/product.jpg",
  },
  {
    title: "Apparel and Garments Photography",
    tag: "Apparel",
    desc: "Lifestyle shoots that connect your products with real-life moments.",
    img: "/garments.jpg",
  },
  {
    title: "Fashion & Model Photography",
    tag: "Fashion",
    desc: "Headshots, facility photography and editorial assets for comms.",
    img: "/carousel3.jpg",
  },
  {
    title: "Furniture & Interior Photography",
    tag: "Furniture",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
    img: "/furniture.jpg",
  },
  {
    title: "Lifestyle & Branding Photography",
    tag: "Lifestyle",
    desc: "Concept, styling and art direction to fit your brand voice.",
    img: "/branding.jpg",
  },
  {
    title: "Photo Editing & Retouching Services",
    tag: "Retouching",
    desc: "Clear timelines and reliable delivery without compromising quality.",
    img: "/retouching.jpg",
  },
  {
    title: "Furniture & Interior Photography",
    tag: "Furniture2",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
    img: "/furniture.jpg",
  },
  {
    title: "Lifestyle & Branding Photography",
    tag: "Lifestyle2",
    desc: "Concept, styling and art direction to fit your brand voice.",
    img: "/branding.jpg",
  },
  {
    title: "Photo Editing & Retouching Services",
    tag: "Retouching2",
    desc: "Clear timelines and reliable delivery without compromising quality.",
    img: "/retouching.jpg",
  },
];

export default function Services() {
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto p-6 mt-7">
      <section id="features" className="bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6 text-center">
            Our{" "}
            <span className="text-red-600 landing-page-title-font">Services</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <Link key={item.tag} href={`/services/${item.tag}`}>
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
                    className={`object-cover group-hover:scale-110 w-full h-150 transition-transform duration-700 ${
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
        </div>
      </section>
    </div>
  );
}
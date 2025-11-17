"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRightIcon } from "lucide-react";

// TypeScript type for portfolio items
interface PortfolioItem {
  category: string;
  images: string[];
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch portfolio JSON from public folder
  const getPortfolioItems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<PortfolioItem[]>("/portfolioItems.json");
      setPortfolioItems(data);
      setLoading(false);
      if (data.length > 0) setActiveCategory("All");
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPortfolioItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mt-10 mb-13 text-center">
        Our{" "}
        <span className="text-red-600 landing-page-title-font tracking-[0.15em]">
          Portfolio
        </span>
      </h1>
      {loading ? (
        <Spinner className="size-8 m-auto" />
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200
              ${
                activeCategory === "All"
                  ? "bg-gray-600 text-white hover:cursor-pointer"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:cursor-pointer"
              }`}
            >
              All
            </button>
            {portfolioItems.map((item) => (
              <button
                key={item.category}
                onClick={() => setActiveCategory(item.category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200
                ${
                  activeCategory === item.category
                    ? "bg-gray-600 text-white hover:cursor-pointer"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:cursor-pointer"
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeCategory === "All"
              ? portfolioItems.map((item) => (
                  <div
                    key={item.category}
                    className="group relative w-full rounded-md overflow-hidden flex items-center justify-center p-2 cursor-pointer"
                    onClick={() => setActiveCategory(item.category)}
                  >
                    <div className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
                      <span className="text-white text-lg font-bold tracking-wide flex items-center gap-1 hover:text-gray-300">
                        View More
                        <ArrowRightIcon className="inline-block size-5" />
                      </span>
                    </div>
                    <Image
                      priority
                      src={item.images[0]}
                      alt={item.category}
                      width={350}
                      height={350}
                      className="transition-transform duration-200 rounded-md group-hover:scale-105 group-hover:shadow-2xl group-hover:border-5 border-gray-900 dark:group-hover:border-white"
                    />
                  </div>
                ))
              : (
                  portfolioItems.find(
                    (item) => item.category === activeCategory
                  )?.images || []
                ).map((image) => (
                  <div
                    key={image}
                    className="relative w-full rounded-md overflow-hidden flex items-center justify-center p-2"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          priority
                          src={image}
                          alt={activeCategory}
                          width={350}
                          height={350}
                          className="cursor-pointer hover:scale-105 hover:transition-transform duration-100 rounded-md hover:shadow-2xl hover:border-5 border-gray-900 dark:hover:border-white"
                        />
                      </DialogTrigger>
                      <DialogContent className="flex justify-center p-4 max-w-[90vw] max-h-[90vh]">
                        <DialogTitle>
                          <span className="sr-only">{activeCategory}</span>
                        </DialogTitle>
                        <InnerImageZoom
                          src={image}
                          zoomSrc={image}
                          zoomType="hover"
                          zoomPreload={true}
                          zoomScale={1.5}
                          hideCloseButton={true}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}

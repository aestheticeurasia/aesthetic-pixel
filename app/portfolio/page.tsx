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

// TypeScript type for portfolio items
interface PortfolioItem {
  category: string;
  images: string[];
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  // Fetch portfolio JSON from public folder
  const getPortfolioItems = async () => {
    try {
      const { data } = await axios.get<PortfolioItem[]>("/portfolioItems.json");
      setPortfolioItems(data);
      if (data.length > 0) setActiveCategory(data[0].category);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    }
  };

  useEffect(() => {
    getPortfolioItems();
  }, []);

  if (!portfolioItems.length)
    return <p className="text-center mt-10">Loading...</p>;

  const activeImages =
    portfolioItems.find((item) => item.category === activeCategory)?.images ||
    [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-10">Our Portfolio</h1>
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
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
      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activeImages.map((image) => (
          <div
            key={image}
            className="relative w-full rounded-md overflow-hidden flex items-center justify-center p-2"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  src={image}
                  alt={activeCategory}
                  width={350} 
                  height={350}
                     className="cursor-pointer hover:scale-100 hover:transition-transform duration-100 rounded-md hover:shadow-2xl hover:border-5 border-gray-900 dark:hover:border-white"
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
    </div>
  );
}

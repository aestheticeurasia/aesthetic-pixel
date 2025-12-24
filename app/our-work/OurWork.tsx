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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PortfolioItem {
  category: string;
  images: string[];
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);

  // get items
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
    <div>
      {/* Main Images */}
      <section className="mt-8 px-4 sm:px-8 lg:px-[160px]">
        {loading ? (
          <Spinner className="size-8 m-auto" />
        ) : (
          <>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
              {/* Left: Title */}
              <div className="text-center md:text-left">
                <h1 className="font-extrabold text-4xl text-white mb-3">
                  Our Work
                </h1>
                <p className="text-muted-foreground max-w-xl">
                  Explore our diverse portfolio of digital assets, product
                  photography, and creative campaigns.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`
        px-5 py-2 rounded-full text-sm font-semibold cursor-pointer
        transition-all duration-300
        ${
          activeCategory === "All"
            ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
            : "bg-[#1a1a1a] text-gray-300 hover:bg-[#262626] hover:text-white"
        }
      `}
                >
                  All
                </button>

                {portfolioItems.map((item) => (
                  <button
                    key={item.category}
                    onClick={() => setActiveCategory(item.category)}
                    className={`
          px-5 py-2 rounded-full text-sm font-semibold cursor-pointer
          transition-all duration-300
          ${
            activeCategory === item.category
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
              : "bg-[#1a1a1a] text-gray-300 hover:bg-[#262626] hover:text-white"
          }
        `}
                  >
                    {item.category}
                  </button>
                ))}
              </div>
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
      </section>

      {/* Call Details */}
      <section className="bg-[#0c0c0d] py-[48px] mt-20">
        <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-[160px] gap-10 lg:gap-0 justify-center lg:justify-between items-center">
          <div className="space-y-6 max-w-xl text-center lg:text-left">
            <div className="space-y-2">
              <h4 className="text-red-600 uppercase font-bold text-sm tracking-wide">
                Call Now
              </h4>
              <h1 className="font-bold text-red-600 text-3xl">
                +880 1711-205200
              </h1>
            </div>

            <div>
              <h1 className="text-white font-bold text-2xl leading-tight">
                Get One Step Digital Solution Under One Roof
              </h1>
              <p className="text-muted-foreground mt-3">
                Web Development, Creative Writing, Digital Marketing, Graphics &
                Video Editing, & so on.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <div className="relative w-full sm:w-[420px]">
              <Input
                type="email"
                placeholder="Enter your email"
                className="
          w-full
          border-[#3f3f46]
          bg-[#070707]
          text-white
          placeholder:text-gray-500
          text-lg
          rounded-full
          pl-7 pr-[150px]
          py-7
          focus:border-red-600
          focus:ring-2 focus:ring-red-600/30
          transition-all
        "
              />

              <Button
                className="
          absolute
          right-2
          top-1/2
          -translate-y-1/2
          bg-[#d00f2c]
          text-white
          text-md
          rounded-full
          px-6
          py-5
          hover:bg-[#a70b1e]
          active:scale-[0.98]
          transition-all
          shadow-lg shadow-red-900/20
          cursor-pointer
        "
              >
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

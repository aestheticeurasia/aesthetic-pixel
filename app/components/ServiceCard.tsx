"use client";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
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
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllServices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/services.json");
      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const HoverImage = ({
    src,
    alt,
    width,
    height,
    link,
    className,
    heading,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    link: string;
    className?: string;
    heading?: string;
  }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleMobileClick = (e: React.MouseEvent) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); 
        setShowOverlay((prev) => !prev);
      }
    };

    return (
      <div className="relative group overflow-hidden rounded-2xl">
        <Link href={link} onClick={handleMobileClick}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} object-cover rounded-2xl`}
          />

          {/* Overlay */}
          <div
            className={`
            absolute inset-0
            flex flex-col items-center justify-center
            text-white text-center font-semibold
            transition-all duration-500 ease-out
            translate-y-full group-hover:translate-y-0 group-hover:opacity-100
            ${
              showOverlay
                ? "opacity-100 translate-y-0"
                : "opacity-0 pointer-events-none"
            }
            bg-gradient-to-t from-black/60 via-black/20 to-transparent
            px-4
          `}
          >
            {/* Heading slides from bottom */}
            {heading && (
              <h3
                className={`
                text-lg md:text-2xl font-extrabold mb-3
                transform translate-y-6 opacity-0
                transition-all duration-500 delay-150
                group-hover:translate-y-0 group-hover:opacity-100
                ${showOverlay ? "translate-y-0 opacity-100" : ""}
              `}
              >
                {heading}
              </h3>
            )}

            <button
              className={`pointer-events-auto border-1 hover:border-none
             text-white py-2 px-4 md:py-2 md:px-6 
              hover:bg-red-800 hover:text-white
              rounded-3xl cursor-pointer text-sm md:text-md
              transform translate-y-6 opacity-0
              group-hover:translate-y-0 group-hover:opacity-100
              ${showOverlay ? "translate-y-0 opacity-100" : ""}
            `}
            >
              View More
            </button>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <Spinner className="size-8 mx-auto mt-10" />
      ) : (
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          {/* Column 1 */}
          <div className="space-y-4">
            <HoverImage
              src="/servicesImg/Product-Photography/7-F.jpg"
              alt="Product Photography"
              heading="Product Photography"
              width={400}
              height={400}
              link="/services/product-photography"
              className="h-138"
            />
            <HoverImage
              src="/servicesImg/Apparel-&-Garment-Photography/1-F.jpg"
              alt="Garment Photography"
              heading="Garment Photography"
              width={400}
              height={200}
              link="/services/apparel-and-garment-photography"
              className="h-85"
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div className="mt-0 md:mt-20">
              <HoverImage
                src="/servicesImg/Corporate-Head-Shots/Jamirul-1-F.jpg"
                alt="Corporate Headshots"
                heading="Corporate Headshots"
                width={400}
                height={400}
                link="/services/corporate-head-shots"
                className="h-90"
              />
            </div>
            <HoverImage
              src="/servicesImg/Fashion-&-Model-Photography/4-F.jpg"
              alt="Fashion Photography"
              heading="Fashion Photography"
              width={400}
              height={200}
              link="/services/fashion-and-model-photography"
              className="h-113"
            />
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <div className="mt-0 md:mt-30">
              <HoverImage
                src="/servicesImg/Furniture-Photography/2-F.jpg"
                alt="Furniture Photography"
                heading="Furniture Photography"
                width={400}
                height={400}
                link="/services/furniture-photography"
                className="h-100"
              />
            </div>

            <HoverImage
              src="/servicesImg/Photo-Retouching/Jewelry-Photo-Retouching-Services.jpg"
              alt="Jewelry Retouching"
              heading="Jewelry Retouching"
              width={400}
              height={200}
              link="/services/photo-retouching"
              className="h-93"
            />
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <HoverImage
              src="/servicesImg/Apparel-&-Garment-Photography/1-F.jpg"
              alt="Apparel Photography"
              heading="Apparel Photography"
              width={400}
              height={400}
              link="/services/apparel-and-garment-photography"
              className="h-110"
            />
            <HoverImage
              src="/servicesImg/Fashion-&-Model-Photography/4-F.jpg"
              alt="Model Photography"
              heading="Model Photography"
              width={400}
              height={200}
              link="/services/fashion-and-model-photography"
              className="h-113"
            />
          </div>
        </div>
      )}
    </div>
  );
}

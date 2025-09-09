"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useState } from "react";

const photos = ["/banner2.png", "/home.jpg", "/home-sm.jpg"];

export default function Banner() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div>
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-center md:text-left">
        <div className="md:col-span-5 mt-10 mx-auto flex flex-col justify-center space-y-8">
          <h1 className="text-4xl font-bold">Trusted by</h1>
          <h1 className="text-4xl font-bold text-red-800">500+</h1>
          <h1 className="text-4xl font-bold">Global Brands</h1>
        </div>

        <div className="md:col-span-7 mt-10">
          <Image
            src="/homeBanner.png"
            alt="Trusted by 500 Brands"
            width={800}
            height={400}
            className="items-end md:items-center mx-auto mb-10"
          />
        </div>
      </div>

      {/* Stats + Image Stack */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gradient-to-r from-gray-800 via-gray-300 to-black py-20">
        {/* Stats */}
        <div
          ref={ref}
          className="md:col-span-6 mx-auto md:flex md:flex-col justify-center space-y-8"
        >
          <div className="md:flex md:space-x-10 space-y-10 md:space-y-0">
            <div className="py-5 px-11 rounded-lg shadow-xl bg-red-800 text-amber-50 text-center">
              <h2 className="text-xl font-bold mb-3">Global Presence</h2>
              <h1 className="text-4xl font-bold">
                {inView ? <CountUp start={0} end={7} duration={2} /> : 0}+
              </h1>
              <h2 className="text-xl font-bold mt-3">Years</h2>
            </div>
            <div className="py-5 px-10 rounded-lg shadow-xl bg-gray-600 text-amber-50 text-center">
              <h2 className="text-xl font-bold mb-3">Captured</h2>
              <h1 className="text-4xl font-bold">
                {inView ? (
                  <CountUp start={0} end={100000} duration={2} separator="," />
                ) : (
                  0
                )}
                +
              </h1>
              <h2 className="text-xl font-bold mt-3">Images</h2>
            </div>
          </div>
        </div>

        {/* Image Stack */}
        <div className="md:col-span-6 mt-17 md:mt-0">
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 h-80 sm:h-96 mx-auto overflow-visible">
            {photos.map((src, i) => {
              const rotation = i === 0 ? -10 : i === 1 ? 0 : 10;
              const xOffset = i === 0 ? -20 : i === 1 ? 0 : 20;
              const yOffset = 0;

              const isActive = hoveredIndex === i;

              return (
                <motion.img
                  key={i}
                  src={src}
                  className="absolute w-full h-full object-cover rounded-xl shadow-lg cursor-pointer"
                  style={{ zIndex: isActive ? 20 : 10 - i }}
                  initial={{
                    x: i % 2 === 0 ? -150 : 150,
                    y: 20,
                    rotate: rotation,
                    opacity: 0,
                  }}
                  whileInView={{
                    x: xOffset,
                    y: yOffset,
                    rotate: rotation,
                    opacity: 1,
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: yOffset - 20,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.5,
                  }}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={
                    () => setHoveredIndex((prev) => (prev === i ? null : i)) // toggle on click
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

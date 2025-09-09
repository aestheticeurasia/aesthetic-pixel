"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const photos = ["/banner2.png", "/home.jpg", "/home-sm.jpg"];

export default function Banner() {
  const { ref, inView } = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.3, // how much of the element should be visible before triggering
  });
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-center md:text-left">
        <div className="md:col-span-5 mt-10 mx-auto flex flex-col justify-center space-y-8 ">
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gradient-to-r from-gray-800 via-gray-300 to-black py-20">
        <div ref={ref} className="md:col-span-6 mx-auto md:flex md:flex-col justify-center space-y-8">
          <div className="md:flex md:space-x-10 space-y-10 md:space-y-0">
            <div className=" py-5 px-11 rounded-lg shadow-xl bg-red-800 text-amber-50 text-center">
              <h2 className="text-xl font-bold mb-3">Global Presence</h2>
              <h1 className="text-4xl font-bold">
                {inView ? <CountUp start={0} end={7} duration={2} /> : 0}+
              </h1>
              <h2 className="text-xl font-bold mt-3">Years</h2>
            </div>
            <div className=" py-5 px-10 rounded-lg shadow-xl bg-gray-600 text-amber-50 text-center">
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
        <div className="md:col-span-6">
          <div className="relative w-64 md:w-80 lg:w-96 h-80 mx-auto">
            {photos.map((src, i) => {
              const rotation = i === 0 ? -15 : i === 1 ? 0 : 15; // adjust angles for fan effect
              const xOffset = i === 0 ? -30 : i === 1 ? 0 : 30; // horizontal spread
              const zIndex = 10 - i; // stack order

              return (
                <motion.img
                  key={i}
                  src={src}
                  className="absolute w-full h-full object-cover rounded-xl shadow-lg"
                  style={{ zIndex }}
                  initial={{
                    x: i % 2 === 0 ? -200 : 200,
                    y: 20,
                    rotate: rotation,
                    opacity: 0,
                  }}
                  whileInView={{
                    x: xOffset,
                    y: 0,
                    rotate: rotation,
                    opacity: 1,
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

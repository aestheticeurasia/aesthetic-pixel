"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  const pathData = "M2 2 H238 V78 H2 Z"; // rectangle without rounded corners
  const pathLength = 2 * (238 + 78); // perimeter = 632
  return (
    <div className="container mx-auto p-6 mt-7">
      <div className=" text-center items-center justify-center flex flex-col">
        <div className="relative mb-10 w-60 h-20 rounded-xl overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-muted rounded-xl z-0"></div>

          <motion.svg
            className="absolute inset-0 w-full h-full z-10"
            viewBox="0 0 240 80"
            fill="none"
          >
            <motion.path
              d={pathData}
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#00f2fe" />
              </linearGradient>
            </defs>
          </motion.svg>

          <div className="relative z-20 p-4 flex items-center justify-center h-full">
            <h1 className="text-2xl font-bold">What we do</h1>
          </div>
        </div>
        <h1 className="text-5xl font-bold leading-snug bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent">
          We are a photography studio
          <br />
          producing high-quality images that
          <br />
          make your product look amazing
        </h1>
      </div>
    </div>
  );
}

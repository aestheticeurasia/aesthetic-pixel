"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPage() {
  const pathData = "M2 2 H238 V78 H2 Z";
  const pathLength = 2 * (238 + 78);

  const stats = [
    { value: "500+", label: "Happy Clients" },
    { value: "5+", label: "Years of Experience" },
    { value: "560+", label: "Projects Completed" },
  ];

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
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-snug bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent">
            We are a photography studio
            <br />
            producing high-quality images that
            <br />
            make your product look amazing
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2, type: "spring" }}
            >
              <Card className="p-10 bg-gradient-to-br from-gray-800 to-gray-700 shadow-xl rounded-2xl hover:scale-105 hover:shadow-2xl transition-transform duration-300">
                <h1 className="text-6xl font-extrabold text-gray-100">
                  {stat.value.replace(/\D/g, "")}
                  <span className="text-white">
                    {stat.value.replace(/\d+/g, "")}
                  </span>
                </h1>
                <h3 className="mt-3 text-xl font-semibold text-gray-200">
                  {stat.label}
                </h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

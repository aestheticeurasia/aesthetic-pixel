"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";

const apsTeam = [
  {
    name: "Abid Hasan Neil",
    role: "CEO",
    imageUrl: "/apsTeam/abidHasan.jpg",
  },
  {
    name: "Jamirul Islam",
    role: "COO",
    imageUrl: "/apsTeam/jamirulIslam.jpg",
  },
  {
    name: "MD Ashaduzzaman",
    role: "Director",
    imageUrl: "/apsTeam/mdAshaduzzaman.jpg",
  },
  {
    name: "Nazmus Sakib",
    role: "Lead Photographer",
    imageUrl: "/apsTeam/nazmusSakib.jpg",
  },
];

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
      <section className=" text-center items-center justify-center flex flex-col">
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
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
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
                  <CountUp end={parseInt(stat.value)} duration={6.75} />
                  {stat.value.includes("+") ? "+" : ""}
                </h1>
                <h3 className="mt-3 text-xl font-semibold text-gray-200">
                  {stat.label}
                </h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="mt-30">
        <h1 className="text-3xl md:text-5xl font-bold leading-snug text-center">
          Our Team
        </h1>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apsTeam.map((member, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <Image
                src={member?.imageUrl}
                alt={member?.name}
                width={250}
                height={250}
                className="rounded-lg object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold">{member?.name}</h2>
              <p className="text-gray-500">{member?.role}</p>
            </div>
          ))}
        </div>
      </section>
       <section className="w-full container mx-auto px-4 mt-10">
        <div className="relative w-full pb-200 border-2 rounded-lg shadow">
          <iframe
            className="absolute top-0 left-0 h-full w-full rounded-lg"
            src="https://www.youtube.com/embed/3fQPBoDUpik?si=7nR6MSC1lSLfwXRg" 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}

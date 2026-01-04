"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  CirclePlay,
  PhoneCall,
  PenTool,
  TrendingUp,
  Video,
  Code,
} from "lucide-react";
import Image from "next/image";
import CountUp from "react-countup";
import { GoDotFill } from "react-icons/go";
import { Input } from "@/components/ui/input";

const apsTeam = [
  {
    name: "Nazmus Sakib",
    role: "Managing Partner & Lead Photographer",
    imageUrl: "/apsTeam/nazmusSakib.jpg",
  },
  {
    name: "MD Ashaduzzaman",
    role: "Director",
    imageUrl: "/apsTeam/mdAshaduzzaman.jpg",
  },
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
];

const capabilities = [
  {
    id: "01",
    title: "Graphics & Video",
    description: "Edit & so on",
    coverImg: "/graphicsVideo.png",
    url: "",
    icon: Video,
  },
  {
    step: "02",
    title: "Web Development",
    description: "Custom design and development",
    coverImg: "/webDev.png",
    url: "",
    icon: Code,
  },
  {
    step: "03",
    title: "Digital Marketing",
    description: "Strategic growth for your brand",
    coverImg: "/digitalMarketing.png",
    url: "",
    icon: TrendingUp,
  },
  {
    step: "04",
    title: "Creative Writing",
    description: "Compelling copy that converts",
    coverImg: "/creativeWriting.png",
    url: "",
    icon: PenTool,
  },
];

export default function AboutPage() {
  const stats = [
    { value: "500+", label: "Happy Clients" },
    { value: "5+", label: "Years of Experience" },
    { value: "560+", label: "Projects Completed" },
  ];

  return (
    <div className="lg:px-25">
      {/* Hero */}
      <section className="flex flex-col lg:flex-row px-6 md:px-12 gap-8 items-stretch justify-center lg:px-[80px]">
        <div className="flex-1 bg-[url('/layoutComponents/redishBlur.svg')] bg-no-repeat bg-bottom-right p-8 lg:p-12 border border-[#222223] rounded-3xl flex flex-col justify-center">
          <div className="max-w-xl">
            <Badge
              variant="outline"
              className="rounded-xl text-red-500 border-red-900 font-bold w-fit mb-6"
            >
              <GoDotFill className="mr-2" /> WHAT WE DO
            </Badge>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We are a
              <span className="text-[#f00004]"> Photography Studio</span>
            </h1>

            <p className="text-[#7e7c83] text-lg mb-10">
              Producing high-quality images that make your product look amazing.
              With 7 years of experience and a passionate team of 100+
              professionals.
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div
            className="relative flex-1 min-h-[260px] group overflow-hidden rounded-2xl
       border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
          >
            <Image
              src="/layoutComponents/aboutCameraMan.png"
              alt="retouching"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 z-10">
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Retouching
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 min-h-[220px] sm:min-h-[280px] lg:flex-1">
            <div
              className="relative group overflow-hidden rounded-2xl min-h-[160px] sm:min-h-[200px]
         border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
            >
              <Image
                src="/garments.png"
                alt="Garments"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md">
                Apparel & Garments
              </Badge>
            </div>

            <div
              className="relative group overflow-hidden rounded-2xl min-h-[160px] sm:min-h-[200px]
         border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
            >
              <Image
                src="/Apparel.png"
                alt="Apparel"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md">
                Apparel
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CountDown */}
      <section className="flex flex-col lg:flex-row px-6 md:px-12 gap-8 items-stretch justify-center lg:px-[85px]">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2, type: "spring" }}
            >
              <Card className="border-[#1a1a1b] hover:border-[#521e1f] bg-[#0e0e0f] rounded-xl text-center py-[32px]">
                <h1 className="text-6xl font-extrabold text-gray-100 hover:text-[#ef4444]">
                  <CountUp end={parseInt(stat.value)} duration={6.75} />
                  {stat.value.includes("+") ? "+" : ""}
                </h1>
                <h3 className="text-muted-foreground uppercase">
                  {stat.label}
                </h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* One Stop Digital Solutions */}
      <section
        className="
        mt-10
    lg:mt-20
    px-4 sm:px-18 
    bg-[url('/layoutComponents/3rdBlur.svg')]
    bg-no-repeat
  bg-top-right
    lg:px-[80px]
  "
      >
        <div className="py-8 lg:text-start text-center">
          <h1 className="text-3xl font-semibold text-white">
            Get One Stop Digital Solutions
          </h1>
          <p className="text-muted-foreground mt-2">Under One Roof</p>
        </div>

        <div
          className="
      mx-auto
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6
    "
        >
          {capabilities.map((step, index) => (
            <Card
              key={index}
              className="
          group
          w-full
          lg:aspect-square
          flex flex-col
          justify-between
          border lg:border-[#222223]
          border-[#7d0508]
          bg-[#0d0d0e]
          rounded-3xl
          p-6
          transition-colors duration-300
          hover:border-[#7d0508]
        "
            >
              <div className="flex flex-col space-y-5">
                <div className="">
                  <step.icon
                    className="
                  p-2
                  lg:text-[#A1A1AA]
                  lg:bg-[#27272A80]
                text-white
                 bg-red-600
                  rounded-lg
                  transition-all duration-300
                  group-hover:text-white
                  group-hover:bg-red-600
                  
                "
                    size={48}
                    strokeWidth={1.5}
                  />
                </div>
                <Image
                  src={step.coverImg}
                  alt={step.title}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Management Team */}
      <section className="mx-6 md:mx-12 lg:mx-[80px] px-5 border-[#151515] bg-[#090909] mt-20 py-10 rounded-xl">
        <div className="text-center">
          <Badge
            variant="outline"
            className="rounded-xl text-red-500 border-red-900 font-bold w-fit mb-6 uppercase"
          >
            Leadership
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold leading-snug text-center text-white">
            Our Team
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apsTeam.map((member, index) => (
            <Card
              key={index}
              className="flex flex-col justify-center py-2 bg-[#050505] border-[#121212] hover:border-[#5a2626] border-1 rounded-2xl"
            >
              <CardContent className="flex justify-center items-center">
                <Image
                  src={member?.imageUrl}
                  alt={member?.name}
                  width={250}
                  height={250}
                  className="rounded-lg object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start text-left">
                <p className="text-xl font-semibold text-white">
                  {member?.name}
                </p>
                <p className="text-[#ef4444]">{member?.role}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="mx-6 md:mx-12 lg:mx-[80px] px-5 mt-10 py-10 rounded-xl">
        <div className="flex justify-center lg:justify-start">
          <Badge
            variant="outline"
            className="rounded-2xl text-[#f87171] border-[#4e1111] border-2 font-bold w-fit mb-3 px-3 py-2"
          >
            <CirclePlay className="mr-2" /> SHOWREEL
          </Badge>
        </div>

        <div className="flex lg:flex-row flex-col justify-between items-center mb-8">
          <h1 className="font-bold text-white text-3xl">
            Experience Our Craft
          </h1>
          <span className="text-muted-foreground w-100 lg:px-0 px-4 lg:text-start text-center mt-4 lg:mt-0">
            See how we bring products to life through cinematic motion, precise
            color grading, and creative direction.
          </span>
        </div>
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

      {/* Newslater */}
     <section className="mx-4 sm:mx-6 md:mx-10 lg:mx-[80px] py-10">
  <div
    className="
      relative
      px-5 sm:px-8 md:px-12 lg:px-32 xl:px-[279px]
      py-10 sm:py-12 lg:py-[80px]
      border-2 border-[#221919]
      hover:border-red-900
      rounded-3xl
      bg-[#0a0a0b]
      text-center
      overflow-hidden
      transition-colors duration-300
    "
  >
    {/* TOP BLUR */}
    <div
      className="
        absolute top-0 right-0
        w-[160px] h-[160px]
        sm:w-[220px] sm:h-[220px]
        lg:w-[300px] lg:h-[300px]
        bg-[url('/layoutComponents/qouteBlur-top.svg')]
        bg-no-repeat bg-contain
        opacity-60
        pointer-events-none
      "
    />

    {/* BOTTOM BLUR */}
    <div
      className="
        absolute bottom-0 left-0
        w-[160px] h-[160px]
        sm:w-[220px] sm:h-[220px]
        lg:w-[300px] lg:h-[300px]
        bg-[url('/layoutComponents/qouteBlur.svg')]
        bg-no-repeat bg-contain
        opacity-60
        pointer-events-none
      "
    />

    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
      Start Your Project
    </h1>

    {/* EMAIL CTA */}
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-8 mb-6">
      <Input
        type="email"
        placeholder="Enter your email"
        className="
          w-full sm:w-[340px]
          border-[#3f3f46]
          bg-[#070707]
          text-white
          placeholder:text-gray-500
          text-base sm:text-lg
          rounded-full
          px-6 py-4 sm:py-5
          focus:border-red-600
          focus:ring-2 focus:ring-red-600/30
          transition-all
        "
      />

      <Button
        className="
          w-full sm:w-auto
          bg-[#d00f2c]
          text-white
          text-base sm:text-md
          rounded-full
          px-8 py-4 sm:py-5
          hover:bg-[#a70b1e]
          active:scale-[0.98]
          transition-all
          shadow-lg shadow-red-900/20
        "
      >
        Start Free Trial
      </Button>
    </div>

    {/* CALL CTA */}
    <div className="flex justify-center">
      <Button
        className="
          flex items-center gap-3
          bg-[#1a1a1b]
          border-2 border-[#dc2626]
          text-base sm:text-lg
          rounded-full
          px-6 sm:px-14
          py-4 sm:py-6
          hover:bg-[#131316]
          hover:border-red-500
          transition-all
          shadow-md shadow-black/40
        "
      >
        <PhoneCall className="w-5 h-5" />
        <span className="text-[#d4d4d8] hidden sm:inline">
          Call Now:
        </span>
        +880&nbsp;1711-205200
      </Button>
    </div>
  </div>
</section>

    </div>
  );
}

"use client";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ClipboardList,
  PanelsTopLeft,
  PenTool,
  ShoppingCartIcon,
  Images,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Star,
} from "lucide-react";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainForm from "./MainForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import ServicesComponents from "./ServiceCard";

interface Blog {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  slug: string;
}

const workSteps = [
  {
    step: "01",
    title: "Your Order",
    description:
      "Submit requirements and ship your products securely to our studio.",
    icon: ShoppingCartIcon,
  },
  {
    step: "02",
    title: "Pre Production",
    description:
      "We prep, steam, style items and plan the perfect lighting setup",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Photoshoot",
    description: "Expert capture using high-end commercial RED equipment.",
    icon: Camera,
  },
  {
    step: "04",
    title: "Post Production",
    description:
      "Retouching, color grading, and final delivery via dark cloud.",
    icon: Sparkles,
  },
];

const capabilities = [
  {
    id: "01",
    title: "Web Design & Dev",
    description: "React.js & Next.js custom storefronts designed for speed.",
    url: "",
    icon: PanelsTopLeft,
  },
  {
    step: "02",
    title: "UI/UX Design",
    description: "Interfaces that convert visitors to buyers seamlessly",
    url: "",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Image Retouching",
    description: "High-end compositing, color grading and manipulation",
    url: "",
    icon: Images,
  },
  {
    step: "04",
    title: "Digital Marketing",
    description: "Planning strategies to boost visibility and ROI",
    url: "",
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    id: "1",
    clientName: "Sarah Jenkins",
    clientAvatar: "SJ",
    role: "CMO, Fashion Nova",
    feedback:
      "The attention to detail is unmatched. Sales increased by 40% after updating our catalog with Red Studio.",
    rating: 5,
  },
  {
    id: "2",
    clientName: "Michel Chen",
    clientAvatar: "MC",
    role: "Founder, TechFlow",
    feedback:
      "Revolution apporach to design! They transformed our brand completely in just two weeks",
    rating: 5,
  },
  {
    id: "3",
    clientName: "Emma Roberts",
    clientAvatar: "ER",
    role: "Director, Luxe",
    feedback:
      "Best Investment we've made. The team is incredibly telented, responsive and professional",
    rating: 5,
  },
];

const faqs = [
  {
    id: "1",
    question: "What industries do you specialize in?",
    answer:
      "We have experience across various industries including fashion, tech, lifestyle, and more. Our team adapts to the unique needs of each sector.",
  },
  {
    id: "2",
    question: "What is your typical project turnaround time?",
    answer:
      "Our typical project turnaround time ranges from 2 to 4 weeks, depending on the complexity and scope of the project. We prioritize quality and timely delivery.",
  },
  {
    id: "3",
    question: "What is your revision policy?",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
  },
];

export default function Banner() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/blogs.json");
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div className="lg:px-25">
      {/* Hero */}
      <section className="flex flex-col lg:flex-row min-h-screen pt-[120px] px-6 md:px-12 gap-8 items-stretch justify-center lg:px-[160px]">
        <div className="flex-1 bg-[url('/layoutComponents/redishBlur.svg')] bg-no-repeat bg-bottom-right p-8 lg:p-12 border border-[#222223] rounded-3xl flex flex-col justify-center">
          <div className="max-w-xl">
            <Badge
              variant="outline"
              className="rounded-xl text-red-500 border-red-900 font-bold w-fit mb-6"
            >
              <GoDotFill className="mr-2" /> NEW STUDIO OPENING
            </Badge>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Scalable Product
              <span className="text-[#f00004]"> Photography for</span> Brands
            </h1>

            <p className="text-[#7e7c83] text-lg mb-10">
              APS delivers high-converting product photography for product
              display pages, landing pages and retail partners. Plus: all the
              creative direction, styling and merchandising expertise to ensure
              your creative converts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 sm:flex-none bg-red-600 rounded-full text-white border-none px-5 lg:px-8 py-3 lg:py-6 hover:bg-red-500 cursor-pointer text-base">
                <a href="#quote">
                  <span className="flex items-center justify-center gap-2 w-full">
                    Talk to an Expert
                    <ArrowRight size={20} />
                  </span>
                </a>
              </Button>

              <Button className="flex-1 sm:flex-none px-5 lg:px-8 py-3 lg:py-6 rounded-full hover:bg-gray-800 cursor-pointer text-white border border-gray-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 min-h-[220px] sm:min-h-[280px] lg:flex-1">
            <div
              className="relative group overflow-hidden rounded-2xl min-h-[160px] sm:min-h-[200px]
        border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
            >
              <Image
                src="/shoes.png"
                alt="Footwear"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md">
                Footwear
              </Badge>
            </div>

            <div
              className="relative group overflow-hidden rounded-2xl min-h-[160px] sm:min-h-[200px]
        border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
            >
              <Image
                src="/model.png"
                alt="Apparel"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md">
                Apparel
              </Badge>
            </div>
          </div>

          <div
            className="relative flex-1 min-h-[260px] group overflow-hidden rounded-2xl
      border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300"
          >
            <Image
              src="/fur-life.png"
              alt="Lifestyle"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-red-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-1">
                LIFESTYLE
              </h3>
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Modern Living Collection
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/*Imported Our Services */}
      <section className="mt-8 px-4 sm:px-8 lg:px-20 xl:px-[160px] hidden md:block">
        <div className="mt-20">
          <div className="text-center mb-10">
            <h1 className="font-extrabold text-6xl text-white mb-10">
              Our <span className="text-[#f00004]">Services</span>
            </h1>
          </div>
          <ServicesComponents />
        </div>
      </section>

      {/* Work Steps */}
      <section
        className="
    mt-[32px]
    px-4 sm:px-18 
    bg-[url('/layoutComponents/redishBlur-top.svg')]
    bg-no-repeat
    bg-right-bottom
    lg:px-[160px]
  "
      >
        <div className="py-8">
          <h1 className="text-2xl font-semibold text-white">
            Simple Steps of Work
          </h1>
          <p className="text-muted-foreground text-sm">
            From concept to final delivery in 4 days
          </p>
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
          {workSteps.map((step, index) => (
            <Card
              key={index}
              className="
    group
    h-full
    lg:min-h-[320px] xl:min-h-[360px]
    flex flex-col
    justify-between
    border lg:border-[#222223]
    border-[#7d0508]
    rounded-3xl
    p-6 md:p-8
    bg-transparent
    transition-colors duration-300
    hover:border-[#7d0508]
  "
            >
              <div className="flex flex-col h-full">
                <h1
                  className="
        text-6xl md:text-7xl
        font-extrabold
        leading-none
        break-words
        text-end
        text-[#7d0508]
        lg:text-muted-foreground/30
        transition-colors duration-300
        group-hover:text-[#7d0508]
      "
                >
                  {step.step}
                </h1>

                <div className="mt-auto">
                  <div className="mb-4 inline-block">
                    <step.icon
                      className="
            p-2
            rounded-lg
            lg:text-[#A1A1AA]
            lg:bg-[#27272A80]
            text-white
            bg-red-600
            transition-all duration-300
            group-hover:text-white
            group-hover:bg-red-600
          "
                      size={48}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl text-white mb-2">
                    {step.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="mt-8 px-4 sm:px-8 lg:px-20 xl:px-[160px]">
        <div className="mt-12 border-[#161616] border-2 rounded-2xl bg-[#090909] p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content Column */}
          <div className="col-span-1 lg:col-span-6">
            <Badge
              variant="outline"
              className="rounded-md text-red-500 border-[#2f0d0d] font-bold w-fit mb-6 px-2 py-1 bg-[#1b0909]"
            >
              APS STUDIO EST. 2018
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight font-semibold">
              Creativity That Gets{" "}
              <span className="text-muted-foreground">Real Results</span>
            </h1>

            <p className="text-muted-foreground mt-5 max-w-lg">
              We believe every product has a story. Our lens is the narrator.
              From startups to Fortune 500s, we help brands visualize their
              potential through distinct imagery.
            </p>

            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 mt-10">
              <div className="flex gap-3 ">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#200d0d] border border-[#3c1212] shrink-0">
                  <Check className="text-red-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">
                    Professional Team
                  </h3>
                  <span className="text-muted-foreground text-sm">
                    Award-winning stylists
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#200d0d] border border-[#3c1212] shrink-0">
                  <Check className="text-red-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">
                    Studio Setup
                  </h3>
                  <span className="text-muted-foreground text-sm">
                    800 sqft facility
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-10 cursor-pointer border-b border-b-gray-400 hover:border-b-red-700 w-fit transition-colors group">
              <h1 className="text-lg font-semibold text-white group-hover:text-red-700 flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </h1>
            </button>

            <hr className="border-[#161616] my-10" />

            <div>
              <h2 className="text-muted-foreground font-semibold uppercase text-xs tracking-widest">
                Trusted by Industry Leaders
              </h2>
              <div className="text-muted-foreground flex flex-wrap gap-6 sm:gap-10 font-bold text-xl sm:text-2xl mt-6 opacity-70 hover:text-white">
                <span>Linear</span>
                <span>Stripe</span>
                <span>Vercel</span>
                <span>Arc</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative flex items-center justify-center col-span-1 lg:col-span-6">
            <div className="w-full relative">
              <Image
                src="/layoutComponents/aboutCameraMan.png"
                alt="About Us Illustration"
                width={514}
                height={498}
                className="object-contain w-full rounded-lg grayscale transition-all duration-300 hover:grayscale-0"
              />
              <div
                className="
      pointer-events-none
      absolute inset-x-0 bottom-0 h-1/3
      bg-gradient-to-t
      from-black/100
      via-black/60
      to-transparent
      rounded-lg
    "
              />

              {/* Floating Stats Card */}
              <Card className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-4 md:left-4 md:right-4 lg:left-10 lg:right-10 bg-[#030303] border-[#1a1a1a] p-4 flex flex-row items-center justify-between rounded-xl shadow-2xl backdrop-blur-sm w-[90%] md:w-auto">
                <div>
                  <h1 className="text-xl md:text-2xl text-white font-semibold">
                    500+
                  </h1>
                  <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                    Projects Completed
                  </p>
                </div>

                <div className="flex -space-x-3">
                  <Avatar className="border-2 border-black h-8 w-8 md:h-10 md:w-10">
                    <AvatarFallback className="bg-red-900 text-white text-[10px] md:text-xs font-bold">
                      NS
                    </AvatarFallback>
                    <AvatarImage src="/apsTeam/nazmusSakib.jpg" alt="@shadcn" />
                  </Avatar>
                  <Avatar className="border-2 border-black h-8 w-8 md:h-10 md:w-10">
                    <AvatarFallback className="bg-red-900 text-white text-[10px] md:text-xs font-bold">
                      20+
                    </AvatarFallback>
                    <AvatarImage
                      src="/apsTeam/jamirulIslam.jpg"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <Avatar className="border-2 border-black h-8 w-8 md:h-10 md:w-10">
                    <AvatarFallback className="bg-red-900 text-white text-[10px] md:text-xs font-bold">
                      20+
                    </AvatarFallback>
                    <AvatarImage
                      src="/apsTeam/mdAshaduzzaman.jpg"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <Avatar className="border-2 border-black h-8 w-8 md:h-10 md:w-10">
                    <AvatarFallback className="bg-[#18181b] text-white text-[10px] md:text-xs font-bold">
                      +20
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="mt-16 px-4 sm:px-8 lg:px-20 xl:px-[160px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white font-bold text-xl md:text-2xl">
            Featured Our Works
          </h1>
          <Link href="/our-work" className="text-muted-foreground flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-sm">
            View All <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group overflow-hidden rounded-2xl border-1 border-transparent hover:border-white transition-all duration-300 aspect-[3/2]">
            <Image
              src="/portfolioA.png"
              alt="Fashion"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 z-10">
              <h3 className="text-red-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">
                Collection
              </h3>
              <h1 className="text-white text-lg md:text-xl font-bold">
                Fashion Apparel 2024
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/portfolioB1.png", label: "Luxury Bag" },
              { src: "/portfolioB2.png", label: "Watches" },
              { src: "/portfolioB3.png", label: "Tech" },
              { src: "/portfolioB4.png", label: "Footwear" },
            ].map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl border-2 border-transparent hover:border-[#d00f2c] transition-all duration-300 aspect-[3/2]"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <Badge className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md border-none text-sm text-white py-0 px-2 ">
                  {item.label}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Skills */}
      <section
        className="
    mt-[32px]
    px-4 sm:px-18 
    bg-[url('/layoutComponents/3rdBlur.svg')]
    bg-no-repeat
  bg-top-right
    lg:px-[160px]
  "
      >
        <div className="py-8">
          <h1 className="text-2xl font-semibold text-white">
            Digital Capabilities
          </h1>
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
          p-6 md:p-8
          transition-colors duration-300
          hover:border-[#7d0508]
        "
            >
              <div className="flex flex-col space-y-10">
                <div className="mt-5">
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
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>
                <div>
                  <a
                    href={step.url}
                    className="font-semibold text-white group-hover:text-red-600 flex items-center gap-1"
                  >
                    Read More <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-16 px-4 sm:px-8 lg:px-20 xl:px-[160px] bg-[url('/layoutComponents/testimonialBlur.svg')] bg-no-repeat bg-cover bg-left-bottom">
        <div className="border-[#1b0e0e] border-2 rounded-xl p-6 lg:p-[48px] relative overflow-hidden">
          <div
            className="md:absolute inset-0 bg-[url('/layoutComponents/testimonialQoute.svg')] 
               bg-no-repeat bg-right-top opacity-5 pointer-events-none mr-5 mt-2"
          />

          <span className="text-sm font-bold text-[#f04545] uppercase">
            Testimonials
          </span>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-white">
                What Our Clients Say
              </h1>
            </div>
            <div>
              <Link href="https://maps.app.goo.gl/fqtfteJ9sJjir3jY6" target="_blank" className="text-muted-foreground cursor-pointer hover:text-white transition-colors">
                View All Reviews{" "}
                <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-[40px]">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-[#181819] bg-[#0c0c0d] p-[24px] flex flex-col h-full"
              >
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? "fill-red-400 text-red-400"
                          : "text-gray-500"
                      }
                    />
                  ))}
                </div>

                <div className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.feedback}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <Avatar>
                    <AvatarImage src={""} alt={testimonial.clientName} />
                    <AvatarFallback className="bg-[#27272a] text-white text-sm font-bold border-[#3c3c3f]">
                      {testimonial.clientAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-white leading-none">
                      {testimonial.clientName}
                    </p>
                    <p className="text-muted-foreground font-semibold text-xs mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 px-4 sm:px-8 lg:px-20 xl:px-[160px] bg-[url('/layoutComponents/3rdBlur.svg')] bg-no-repeat bg-left-top">
        <div className="lg:py-[48px] px-3 lg:px-[232px] pb-10 md:pb-0">
          <h1 className="text-white text-2xl lg:text-4xl font-bold text-center mb-[32px]">
            Frequently Asked Questions
          </h1>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-2 border-[#24191a] bg-[#0b0b0c] rounded-2xl mb-[12px] px-4 py-2"
                >
                  <AccordionTrigger className="text-white text-md lg:text-lg hover:no-underline underline-offset-0 cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="my-[32px] px-4 sm:px-8 lg:px-20 xl:px-[160px]">
        <div className=" border-[#181819] rounded-xl bg-[#0c0c0d]">
          <div className="grid lg:grid-cols-12 p-[48px] gap-[52px]">
            <div className="col-span-6 flex flex-col justify-between">
              <div>
                <h1 className="text-white text-4xl font-bold">
                  Enhance your Brand Potential at{" "}
                  <span className="text-[#ef4444]">No Cost</span>
                </h1>
                <p className="text-muted-foreground mt-[24px]">
                  Book a discovery call to see how we can align our creative
                  vision with your business goals.
                </p>
              </div>
              <div>
                <div className="flex gap-3 mt-[24px] items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#200d0d] border border-[#3c1212] shrink-0">
                    <Check className="text-red-400" size={20} />
                  </div>
                  <h3 className="text-[#d4d4d8] text-md font-medium">
                    Free 30-min strategy call
                  </h3>
                </div>
                <div className="flex gap-3 mt-[24px] items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#200d0d] border border-[#3c1212] shrink-0">
                    <Check className="text-red-400" size={20} />
                  </div>
                  <h3 className="text-[#d4d4d8] text-md font-medium">
                    Brand visual audit included
                  </h3>
                </div>
                <div className="flex gap-3 mt-[24px] items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#200d0d] border border-[#3c1212] shrink-0">
                    <Check className="text-red-400" size={20} />
                  </div>
                  <h3 className="text-[#d4d4d8] text-md font-medium">
                    Actionable growth recommendations
                  </h3>
                </div>
                <div className="flex gap-3 mt-[24px] items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#200d0d] border border-[#3c1212] shrink-0">
                    <Check className="text-red-400" size={20} />
                  </div>
                  <h3 className="text-[#d4d4d8] text-md font-medium">
                    Clear roadmap for your brand
                  </h3>
                </div>
              </div>
              <hr className="border-[#19191a]" />
              <div>
                <h1 className="text-md text-[#71717a] uppercase font-bold mt-10 md:mt-0">
                  Meet the experts
                </h1>
                <div className="flex lg:flex-row flex-col lg:gap-0 gap-5 mt-[24px]">
                  <div className="flex gap-3 items-center">
                    <div>
                      <Avatar className="border-2 h-15 w-15 border-[#b42121]">
                        <AvatarFallback className="bg-red-900 text-white text-sm font-bold">
                          NS{" "}
                        </AvatarFallback>
                        <AvatarImage src="/apsTeam/nazmusSakib.jpg" alt="aps" />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-bold text-white">Nazmus Sakib</p>
                      <p className="text-[#71717a]">
                        Managing Partner & Lead Photographer
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div>
                      <Avatar className="border-2 h-15 w-15 border-[#b42121]">
                        <AvatarFallback className="bg-red-900 text-white text-sm font-bold">
                          NS{" "}
                        </AvatarFallback>
                        <AvatarImage src="/apsTeam/abidHasan.jpg" alt="aps" />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-bold text-white">Abid Hasan Neil</p>
                      <p className="text-[#71717a]">
                        Chief Executive Officer (CEO)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-span-6 bg-[#080808] border-[#1f0c0c] rounded-xl lg:p-6"
              id="quote"
            >
              <MainForm />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Insight */}
      <section className="lg:mt-15 px-4 sm:px-8 lg:px-20 xl:px-[160px]">
        <h1 className="py-2 lg:py-0 text-2xl font-bold text-white text-center lg:text-start">
          Latest Insights
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <Card
              key={blog?.id}
              className="bg-transparent border-none px-5 lg:px-0"
            >
              <div className="relative group overflow-hidden transition-all duration-300 aspect-[3/2] rounded-lg">
                <Badge className="absolute top-5 left-2 z-10">
                  {blog?.category}
                </Badge>
                <Image
                  src={blog?.coverImage}
                  alt={blog?.title}
                  width={400}
                  height={250}
                  className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-white text-lg font-bold mt-3">
                {blog?.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {blog?.description}
              </p>
              <Link
                href={`/blog/${blog?.slug}`}
                className="text-red-800 flex items-center gap-2 font-bold mt-2 hover:underline"
              >
                Read more <ArrowRight size={16} />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="mt-[32px] px-4 sm:px-8 lg:px-20 xl:px-[160px] bg-transparent">
        <div className="relative lg:px-[279px] lg:py-[80px] px-10 py-15 border-2 border-[#221919] hover:border-red-900 rounded-3xl bg-[#0a0a0b] text-center overflow-hidden">
          <div
            className="
      absolute top-0 right-0
      w-[300px] h-[300px]
      bg-[url('/layoutComponents/qouteBlur-top.svg')]
      bg-no-repeat bg-contain
      pointer-events-none
      opacity-70
    "
          />

          <div
            className="
      absolute bottom-0 left-0
      w-[300px] h-[300px]
      bg-[url('/layoutComponents/qouteBlur.svg')]
      bg-no-repeat bg-contain
      pointer-events-none
      opacity-70
    "
          />
          <h1 className="lg:text-5xl text-3xl font-bold text-white">
            Get One Stop Digital <br className="lg:hidden" />
            Solutions <br className="lg:hidden" /> Under One Roof
          </h1>

          <h4 className="text-muted-foreground my-10 text-lg">
            Ready to Transform your brand image? Call us Directly:{" "}
            <br className="lg:hidden" />
            <span className="font-bold text-red-800">+880 1711-205200</span>
          </h4>

          <div className="flex justify-center">
            <a href="#quote">
              <Button className="bg-white font-bold text-black text-xl rounded-4xl px-12 py-7 hover:bg-red-700 hover:text-white cursor-pointer">
                Get Free Quote
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

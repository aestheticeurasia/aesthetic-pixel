"use client";
import {
  ArrowRight,
  Star,
  Clock,
  Trophy,
  User,
  Quote,
  BarChart3,
  Monitor,
  ImageIcon,
  Paintbrush,
  Plus,
  Minus,
  Lightbulb,
  Pencil,
  Cloud,
  Zap,
  CircleCheck,
} from "lucide-react";
import { FaGoogle, FaStar, FaStarHalfAlt, FaWhatsapp } from "react-icons/fa";
import { SiG2, SiTrustpilot } from "react-icons/si";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import ServicesComponents from "./ServiceCard";
import dayjs from "dayjs";
import Link from "next/link";
import BookASlotForm from "./BookASlotForm";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className={`mb-4 rounded-xl border-3 border-red-500 transition-all duration-300 ${
        isOpen ? "shadow-sm" : "hover:border-red-700"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
      >
        <span className="text-lg font-medium text-gray-800 pr-4">
          {question}
        </span>
        <span
          className={`text-teal-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? (
            <Minus className="text-red-500" size={24} />
          ) : (
            <Plus className="text-red-500" size={24} />
          )}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm md:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const Doodles = () => (
  <>
    {/* Top Left Lightbulb */}
    <div className="absolute -top-10 -left-10 text-red-500 opacity-60 hidden lg:block transform -rotate-12">
      <Lightbulb size={64} strokeWidth={1.5} />
    </div>

    {/* Bottom Left Creativity Icons */}
    <div className="absolute bottom-10 left-0 text-red-500 opacity-60 hidden lg:block">
      <div className="relative">
        <Pencil
          size={48}
          strokeWidth={1.5}
          className="absolute top-0 left-0 transform -rotate-45"
        />
        <Cloud size={40} strokeWidth={1.5} className="absolute top-8 left-8" />
      </div>
    </div>

    {/* Top Center/Right Icon */}
    <div className="absolute top-0 right-1/2 text-red-500 opacity-60 hidden lg:block transform translate-x-12 -translate-y-8">
      <div className="relative">
        <Pencil size={32} strokeWidth={1.5} className="transform rotate-90" />
        <Cloud
          size={32}
          strokeWidth={1.5}
          className="absolute -top-4 -right-4 opacity-50"
        />
      </div>
    </div>

    {/* Bottom Right Brain/Idea Icon */}
    <div className="absolute -bottom-5 right-20 text-red-500 opacity-60 hidden lg:block transform rotate-12">
      <Zap size={48} strokeWidth={1.5} />
      <div className="absolute -top-2 -right-2 text-red-500">
        <Lightbulb size={24} />
      </div>
    </div>
  </>
);

interface Author {
  id: string;
  name: string;
  profileUrl: string;
}

interface Blog {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: Author;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

const faqData = [
  {
    id: "item-1",
    question: "Do You Offer Bulk Image Retouching Services?",
    answer:
      "Yes, we handle bulk orders efficiently while ensuring consistent quality across all your product images. Our streamlined process and dedicated team allow us to deliver high volumes on schedule.",
  },
  {
    id: "item-2",
    question: "Can You Match The Retouching Style To My Brand?",
    answer:
      "Absolutely. We work closely with you to understand your brand's aesthetic. You can provide a style guide or sample images, and our experts will ensure every photo aligns perfectly with your brand identity.",
  },
  {
    id: "item-3",
    question: "What Is The Turnaround Time For Projects?",
    answer:
      "Turnaround time depends on the complexity and volume of the images. Standard projects are typically completed within 24-48 hours. We also offer express services for urgent requirements.",
  },
  {
    id: "item-4",
    question: "How Do I Send And Receive My Files?",
    answer:
      "We support various file transfer methods, including FTP, WeTransfer, Dropbox, and Google Drive. Once the project is complete, we will deliver the retouched images back to you through your preferred method.",
  },
  {
    id: "item-5",
    question: "What Kind Of Image Formats Do You Work With?",
    answer:
      "We accept all standard image formats, including JPEG, PNG, TIFF, PSD, and various RAW formats from different cameras. We can deliver the final images in any format you require.",
  },
  {
    id: "item-6",
    question: "What Kind Of Image Formats Do You Work With?",
    answer:
      "We accept all standard image formats, including JPEG, PNG, TIFF, PSD, and various RAW formats from different cameras. We can deliver the final images in any format you require.",
  },
];
const services = [
  {
    title: "Web Design & Development",
    description: "Molestie eos tempus culp aptent pariatur eos.",
    icon: <Monitor className="w-8 h-8 text-red-500" />,
    link: "#",
  },
  {
    title: "UI/UX & Graphics Designing",
    description: "Molestie eos tempus culp aptent pariatur eos.",
    icon: <Paintbrush className="w-8 h-8 text-red-500" />,
    link: "#",
  },
  {
    title: "Image Editing & Retouching",
    description: "Molestie eos tempus culp aptent pariatur eos.",
    icon: <ImageIcon className="w-8 h-8 text-red-500" />,
    link: "#",
  },
  {
    title: "Digital Market Planning",
    description: "Molestie eos tempus culp aptent pariatur eos.",
    icon: <BarChart3 className="w-8 h-8 text-red-500" />,
    link: "#",
  },
];

const workSteps = [
  {
    number: "1",
    title: "Your Order",
    description: "Firstly place your requirement",
  },
  {
    number: "2",
    title: "We Collect",
    description: "Collect all the material or Model",
  },
  {
    number: "3",
    title: "We Shoot",
    description: "We Shoot it in house Studio",
  },
  {
    number: "4",
    title: "We Deliver",
    description: "Finally Deliver all the Files",
  },
];

const LongArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-64 h-6 text-black"
  >
    <path d="M0 12h179" />
    <path d="M173 6.5l6 5.5-6 5.5" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    name: "Harley Scotson",
    role: "CUSTOMER",
    quote:
      "Venenatis delectus delectus facilis diamlorem platea magni cumque accumsan euismod, ratione quasi congue placeat vulputate id aptent mattis cupidatat, ac deserunt, aperiam. Egestas recusandae iste id.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Sally Walter",
    role: "CUSTOMER",
    quote:
      "Venenatis delectus delectus facilis diamlorem platea magni cumque accumsan euismod, ratione quasi congue placeat vulputate id aptent mattis cupidatat, ac deserunt, aperiam. Egestas recusandae iste id.",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 justify-center my-6">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={18}
          className={`${
            index < rating
              ? "fill-red-500 text-red-500"
              : "fill-transparent text-red-500"
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ data }: { data: (typeof testimonials)[0] }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto group">
      {/* Card Content Box */}
      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300 relative w-full flex flex-col items-center text-center">
        {/* Large Quote Icon */}
        <div className="mb-6">
          <Quote
            size={64}
            strokeWidth={0.5}
            className="text-red-400 rotate-180 opacity-60"
          />
        </div>

        {/* Quote Text */}
        <p className="text-gray-500 italic leading-relaxed font-light mb-4">
          {data.quote}
        </p>

        {/* Stars */}
        <StarRating rating={data.rating} />
      </div>

      {/* Floating Avatar - Overlaps using negative margin */}
      <div className="-mt-10 z-10 relative">
        <div className="p-1 bg-white rounded-full shadow-sm">
          <Image
            width={200}
            height={200}
            src={data.image}
            alt={data.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
          />
        </div>
      </div>

      {/* Name & Role */}
      <div className="text-center mt-4">
        <h3 className="text-xl font-bold text-slate-900">{data.name}</h3>
        <p className="text-red-500 text-xs font-bold tracking-widest mt-1 uppercase">
          {data.role}
        </p>
      </div>
    </div>
  );
};

export default function Banner() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getAllBlog = async () => {
    try {
      const { data } = await axios.get("/blogs.json");
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  //carousel play
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  // scroll to booking form
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-transparent md:bg-transparent flex flex-col items-center text-center mt-40 relative">
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold leading-[1.15] tracking-[0.02em] max-w-7xl text-gray-900 dark:text-white font-bebas">
          PRODUCT PHOTOGRAPHY THAT
          <br />
          SCALES WITH YOUR BRAND
        </h1>

        <p className="text-base sm:text-lg text-center max-w-xl text-gray-600 dark:text-gray-300 mb-10">
          APS delivers high-converting product photography for product display
          pages, landing pages and retail partners. Plus: all the creative
          direction, styling and merchandising expertise to ensure your creative
          converts.
        </p>
        <div className="flex gap-4">
          <button
            onClick={scrollToBooking}
            className="border-2 text-white bg-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-700 transition-colors rounded-md cursor-pointer text-sm md:text-lg"
          >
            Talk to an Expert
          </button>
          <button
            onClick={scrollToBooking}
            className="border-2 text-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-100 transition-colors rounded-md cursor-pointer text-sm md:text-lg"
          >
            Get Started
          </button>
        </div>
        {/* <Carousel
          plugins={[heroPlugin.current]}
          className="absolute inset-0 w-full h-full z-0"
        >
          <CarouselContent className="h-full">
            {carouselImages.map((src, index) => (
              <CarouselItem key={index} className="h-screen relative">
                <Image
                  fill
                  alt="hero bg"
                  src={src}
                  className="object-cover" 
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute inset-0 w-full h-full bg-black/40 z-5" />
        <div className="lg:mt-[250px] relative z-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold mt-2">
            Creative Imagery With
            <br />
            Flawless Photography
          </h1>
          <p className="text-white max-w-md mt-4 text-md mx-auto text-center">
            Our expert team blends precise product photography with innovative
            retouching and exact color matching, delivering images that exceed
            your expectations.
          </p>
          <button
            onClick={scrollToBooking}
            className="mt-6 md:mt-8 bg-red-500 text-white py-3 px-5 md:py-4 md:px-6 font-bold hover:bg-red-600 transition-colors rounded-md cursor-pointer text-sm md:text-base"
          >
            Get Started <ArrowRight className="inline-block ml-2" size={18} />
          </button>
        </div> */}
      </section>

      {/* Services Section */}
      <section className="font-sans py-10 md:py-0 mx-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center">
            <ServicesComponents />
          </div>
          <div className="flex justify-center">
            <h1 className="text-center font-xl font-bold mt-10 flex flex-wrap items-center gap-3 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1 w-full md:w-auto justify-center">
                25K+ BRANDS LOVE US
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStarHalfAlt className="text-yellow-500" />
              </span>

              <span className="flex items-center gap-2 w-full md:w-auto justify-center text-gray-500 dark:text-gray-400">
                4.6 RATING ON
                <FaGoogle className="text-blue-500" />
                <SiTrustpilot className="text-green-500" />
                <SiG2 className="text-orange-500" />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* <section className="pt-10 pb-20">
        <div className="container mx-auto px-14">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-16 text-center">
            Simple Steps of{" "}
            <span className="text-red-600 landing-page-title-font tracking-[0.15em]">
              Work
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map((step) => (
              <div
                key={step.number}
                className="relative bg-gradient-to-br from-white to-red-100 rounded-r-2xl p-8 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600" />

                <div className="px-8">
                  <div className="text-7xl font-bold text-red-600 mb-3 leading-none">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-900 text-sm  leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="">
                  <LongArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="md:py-18 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-16 text-center">
            Simple Steps of{" "}
            <span className="text-red-600 landing-page-title-font tracking-[0.15em]">
              Work
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative h-0 w-full pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 h-full w-full rounded-lg"
                src="https://www.youtube.com/embed/jON-veDY13Q?si=W6_S-z8Ean2eXVUE"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-0.5 z-0" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workSteps.map((step) => (
                  <div
                    key={step.number}
                    className="relative bg-gradient-to-br from-white to-red-100 rounded-r-2xl p-8 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 group overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600 z-10" />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-20 pointer-events-none" />

                    <div className="px-8 relative z-30">
                      <div className="text-7xl font-bold text-red-600 mb-3 leading-none">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="relative z-30">
                      <LongArrowRight />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="w-full container mx-auto px-4 mb-16 md:mb-24">
        <div className="relative h-0 w-full pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 h-full w-full rounded-lg"
            src="https://www.youtube.com/embed/jON-veDY13Q?si=W6_S-z8Ean2eXVUE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section> */}
      <section className="bg-[#292929] text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center gap-3">
                <span className="uppercase text-sm font-bold tracking-widest text-gray-300">
                  About Us
                </span>
                <div className="h-[2px] w-12 bg-gray-600"></div>
              </div>

              <h2 className="text-4xl md:text-4xl font-bold leading-tight">
                We Use Creativity To <br />
                <span className="text-red-500">Get Our Clients</span>
              </h2>

              <p className="text-gray-400 leading-relaxed">
                Quibusdam mollitia quas, placeat aliqua quisquam facere dicta
                quos placerat vulputate consequun.
              </p>

              {/* Progress Bars */}
              <div className="space-y-6 pt-4">
                <div>
                  <h5 className="font-bold mb-2">Business Skills</h5>
                  <Progress className="bg-white [&>*]:bg-red-500" value={95} />
                </div>
                <div>
                  <h5 className="font-bold mb-2">Successful Projects</h5>
                  <Progress className="bg-white [&>*]:bg-red-500" value={88} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center relative py-10 lg:py-0">
              <div className="relative z-10 w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden">
                <Image
                  fill
                  src="/aboutUsImg.png"
                  alt="Team working together"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8 pl-0 lg:pl-8">
              <p className="text-gray-400 leading-relaxed">
                Quibusdam mollitia quas, placeat aliqua quisquam facere dicta
                quos placerat.
              </p>

              <div className="flex items-start gap-8 ">
                <div className="bg-[#2a1a1a] p-3 rounded-full shrink-0">
                  <Trophy className="w-8 h-8 text-[#FF3366]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg leading-tight">
                    We&apos;re In This Business Since 2020 & We Provide Best
                    Services.
                  </h4>
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-4">
                  <div
                    className="text-2xl text-gray-400 italic transform -rotate-6"
                    style={{ fontFamily: "'Brush Script MT', cursive" }}
                  >
                    George Smith
                  </div>
                  <div className=" space-y-2">
                    <div className="text-lg font-bold text-white mt-1">
                      George Smith
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      CEO, Founder
                    </div>
                  </div>
                </div>

                <div className="mt-20 flex justify-center">
                  <Link href="/about">
                    <button className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-red-900/20 group cursor-pointer">
                      MORE ABOUT US
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Trusted Partners Section */}
          <div className="mt-15 pt-12">
            <div className="text-center mb-10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Our Trusted Partners
              </h3>
            </div>
            <div className="flex flex-wrap justify-center md:justify-between items-start gap-8 md:gap-12">
              {[
                { src: "/bigShot.png", name: "BIG SHOT" },
                { src: "/sewnco.jpg", name: "SewnCo" },
                { src: "/shishuParibahan.png", name: "Shishu Paribahan" },
                { src: "/frontPlay.png", name: "FrontPlay Headware" },
                { src: "/wearix.jpg", name: "Wearix" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-[140px] flex flex-col items-center gap-3"
                >
                  <div className="h-[100px] w-full flex items-center justify-center">
                    <Image
                      width={100}
                      height={100}
                      alt={item.name}
                      src={item.src}
                      className="object-contain max-h-full w-auto"
                    />
                  </div>
                  <h3 className="text-white font-bold text-center text-sm min-h-[40px] flex items-start justify-center">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-10 text-center">
            See Our{" "}
            <span className="text-red-600 landing-page-title-font tracking-[0.15em]">
              Portfolios
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="md:col-span-1 md:row-span-3">
              <Image
                src="/homePortfolio/singleModel.jpg"
                alt="Single Model"
                width={400}
                height={600}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <Image
                src="/homePortfolio/coupleModel.jpg"
                alt="Couple Model"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            <div>
              <Image
                src="/homePortfolio/Sweetshirt.jpg"
                alt="Sweetshirt"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>

            <div>
              <Image
                src="/homePortfolio/Bags.jpg"
                alt="Bags"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            <div>
              <Image
                src="/homePortfolio/Shoe.jpg"
                alt="Shoe"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <Image
                src="/homePortfolio/Headphone.jpg"
                alt="Headphone"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <Image
                src="/homePortfolio/Watch.jpg"
                alt="Watch"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Discover More
              <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Extra curricular section */}
      </section>

      {/* Extra Curricular Section */}
      <section className=" pb-15 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest text-red-500 uppercase">
                Popular Services
              </span>
              <div className="h-px w-12 bg-red-500/50 relative">
                <div className="absolute -left-1 -top-[3px] w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Offering & <span className="text-red-500">Expertise</span>
            </h2>

            <p className="text-slate-500 text-lg">
              Rerum veritatis eu amet facilisis consectetur scelerisque.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10 px-10 md:px-30">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <Card className="relative z-10 flex flex-col items-center text-center px-6 h-full transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="p-3 rounded-full bg-red-50">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight px-2">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <Link
                    href={service.link}
                    className="mt-auto inline-flex items-center text-xs font-bold text-red-500 tracking-widest hover:text-red-600 transition-colors group-hover:gap-2 gap-1 uppercase"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all hover:shadow-lg hover:shadow-red-500/30 inline-flex items-center gap-2 group cursor-pointer">
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 px-4 bg-slate-50 min-h-screen font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-red-500 font-bold text-xs tracking-widest uppercase">
                Client Feedback
              </span>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="h-[1px] w-12 bg-red-500"></div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Client&apos;s{" "}
              <span className="text-red-500">Testimonial</span>
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Rerum veritatis eu amet facilisis consectetur scelerisque.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-16">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} data={testimonial} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="https://maps.app.goo.gl/PDHdsJ7XwWSj89rq7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-red-900/20 group cursor-pointer">
                VIEW ALL TESTIMONIALS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full py-16 bg-white overflow-hidden font-sans">
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-5/12 relative">
              <Doodles />
              <div className="relative z-10 pt-4 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Frequently Asked <br />
                  <span className="relative inline-block text-red-500">
                    Questions
                  </span>
                </h2>
                <p className="mt-8 text-lg text-gray-700 leading-relaxed max-w-md">
                  From seamless execution to innovative solutions, we ensure you
                  have everything you need—and more.
                </p>
              </div>
            </div>

            {/* Accordion */}
            <div className="lg:w-7/12 flex flex-col justify-center">
              <div className="w-full">
                {faqData.map((item, index) => (
                  <FAQItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gradient-to-bl from-gray-800 via-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="bg-gradient-to-bl space-y-4">
              <button className="py-2 px-5 border-3 border-red-600 text-red-200 rounded-full font-bold">
                Claim a $799 Consultation. On US!
              </button>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-6 mb-6">
                Enhance your Brand Potelntial
                <br />
                <span className="font-cursive">At No Cost!</span>
              </h1>
              <div className="space-y-4 text-sm leading-relaxed font-bold my-5 text-white">
                <div className="flex gap-2">
                  <CircleCheck className="text-red-600" /> Expect a response
                  from us withing 24 hours.
                </div>
                <div className="flex gap-2">
                  <CircleCheck className="text-red-600" /> We&apos;re happy sign
                  an NDA upon request.
                </div>
                <div className="flex gap-2">
                  <CircleCheck className="text-red-600" /> Get access to a team
                  of dedicated product specialists.
                </div>
              </div>
              <div className="space-y-4">
                <Image
                  src="/apsTeam/abidHasan.jpg"
                  alt="Consultation Image"
                  width={200}
                  height={300}
                  className="mt-6 rounded-lg shadow-md"
                />

                <span>
                  <h3 className="font-bold text-lg">Abid Hasan Neil</h3>
                  <h5 className="text-muted-foreground">
                    Chief Executive Officer (CEO)
                  </h5>
                </span>
              </div>
              <div className="mt-6">
                <span className="text-base text-gray-500 font-bold flex items-center gap-2">
                  <FaWhatsapp className="text-green-500 w-6 h-6" />
                  +880 1970-831822
                </span>
                <h5 className="font-bold text-red-700 mt-2">
                  Book a Call Directly
                </h5>
              </div>
            </div>

            {/* --- Contact Form --- */}
            <div id="booking" className="border-2 p-3 rounded-2xl">
              <BookASlotForm />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white my-15">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Learn About Sustainable Marketing
          </h2>
          <div className="relative max-w-6xl mx-auto">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-4">
                {blogs.map((blog) => (
                  <CarouselItem
                    key={blog.slug}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg h-full">
                      <div className="relative">
                        <a href={`/blog/${blog.slug}`} className="block">
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            width={400}
                            height={208}
                            className="w-full h-52 object-cover"
                            loading="lazy"
                          />
                        </a>
                        {blog.tags && blog.tags.length > 0 && (
                          <span className="absolute top-4 left-4 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm capitalize">
                            {blog.tags[0]}
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            <span>By {blog.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>
                              {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          <a
                            href={`/blog/${blog.slug}`}
                            className="hover:text-red-600 transition-colors"
                          >
                            {blog.title}
                          </a>
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                          {blog.description}
                        </p>
                        <a
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center text-red-600 font-semibold mt-6 hover:text-red-700 transition-colors"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10  sm:inline-flex" />
              <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10  sm:inline-flex" />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}

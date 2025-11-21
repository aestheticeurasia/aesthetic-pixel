"use client";
import {
  ArrowRight,
  Check,
  Clock,
  Mail,
  Phone,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ServicesComponents from "./ServiceCard";
import BrandSlider from "./BrandSlider";
import dayjs from "dayjs";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import BookASlotForm from "./BookASlotForm";

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

const faqItems = [
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

const features = [
  "Turn Your Ordinary Product Into Extraordinary Photos",
  "Stronger Customer Connection Through Impactful Visuals.",
  "Our Photography Style Drives Your Business Sales",
];

const testimonials = [
  {
    rating: 5,
    text: "Amazing experience! The team was professional and the photos turned out fantastic. Highly recommend their services for anyone looking to enhance their product images.",
    author: {
      name: "Maria Clayer",
      title: "Founder",
      imageSrc: "/client1.svg",
    },
  },
  {
    rating: 5,
    text: "Amazing experience! The team was professional and the photos turned out fantastic. Highly recommend their services for anyone looking to enhance their product images.",
    author: {
      name: "Leonard Cooper",
      title: "Founder",
      imageSrc: "/client2.svg",
    },
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
const carouselImages = ["/heroBg.png", "/gridBanner.png", "/product.jpg"];

export default function Banner() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

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

  const heroPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // scroll to booking form
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-transparent md:bg-transparent flex flex-col items-center text-center mt-40 relative">
        <h1
          className="text-4xl sm:text-5xl md:text-8xl font-extrabold leading-[1.15] tracking-[0.02em] max-w-7xl text-gray-900 dark:text-white font-bebas"
        >
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
      <section className="bg-gray-50 font-sans py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center">
            <ServicesComponents />
          </div>
        </div>
      </section>

      {/* Works Steps Section */}
      <section className="bg-[#f8f7fa] py-16 md:py-24">
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
      </section>
      <section className="w-full container mx-auto px-4 mb-16 md:mb-24">
        <div className="relative h-0 w-full pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 h-full w-full rounded-lg"
            src="https://www.youtube.com/embed/jON-veDY13Q?si=W6_S-z8Ean2eXVUE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Image
                  src="/quoteBg.jpeg"
                  alt="Studio photoshoot setup"
                  width={300}
                  height={500}
                  className="w-full h-full object-cover rounded-l-lg shadow-lg"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <Image
                    src="/carousel1.jpg"
                    alt="Product photo editing"
                    width={300}
                    height={250}
                    className="w-full h-auto object-cover rounded-tr-lg shadow-lg"
                  />
                </div>

                <div className="bg-red-600 rounded-br-lg flex items-center justify-center p-4 space-x-6 shadow-lg">
                  <div className="text-white">
                    <Settings size={50} />
                  </div>
                  <div className="text-white">
                    <p className="text-3xl lg:text-4xl font-bold">5+</p>
                    <p className="text-xs lg:text-sm font-medium">
                      Years Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Make Your Product Shine
                <br />
                With APS
              </h2>

              <p className="mt-4 text-gray-700 text-justify">
                We are just a step away from you. Our photography services are
                designed to bring out the best in your product photos. Along
                with the latest technology and techniques, our experienced
                photographer and in-house expert retouching team ensure your
                product photo looks its best, delivering exceptional results for
                your business.
              </p>

              <ul className="mt-6 space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="flex-shrink-0 bg-red-500 rounded-full p-1 flex items-center justify-center w-5 h-5">
                      <Check className="text-white font-bold" />
                    </span>
                    <span className="ml-3 font-semibold text-gray-800">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/services"
                className="mt-8 inline-flex items-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                Discover More
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
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
      </section>
      <section className="bg-white mb-20">
        <div className="container mx-auto max-w-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4 col-span-1"
              defaultValue="item-1"
            >
              {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border rounded-lg shadow-sm transition-all duration-300 data-[state=open]:bg-black data-[state=open]:text-white data-[state=open]:border-black"
                >
                  <AccordionTrigger className="w-full text-left p-6 font-semibold text-lg hover:no-underline cursor-pointer">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-6 pt-0 text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {faqItems.length > 1 && (
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-4 col-span-1"
              >
                {faqItems.slice(Math.ceil(faqItems.length / 2)).map(
                  (
                    item // Render the second half of items
                  ) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border rounded-lg shadow-sm transition-all duration-300 data-[state=open]:bg-black data-[state=open]:text-white data-[state=open]:border-black"
                    >
                      <AccordionTrigger className="w-full text-left p-6 font-semibold text-lg hover:no-underline cursor-pointer">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="p-6 pt-0 text-gray-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            )}
          </div>
        </div>
      </section>
      <section className="bg-[#f8f7fa] py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            What Customer Say About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full bg-white rounded-lg p-8 shadow-sm relative">
                  <div className="flex space-x-1 text-red-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="absolute right-8 text-7xl text-black font-serif opacity-20 select-none pointer-events-none">
                    ”
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-6 bg-white border-b border-r border-gray-300 transform rotate-45 -mb-3"></div>
                </div>

                <div className="mt-6 flex flex-col items-center text-center">
                  <Image
                    src={testimonial.author.imageSrc}
                    alt={testimonial.author.name}
                    width={6}
                    height={6}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                  <h3 className="mt-3 font-bold text-lg text-gray-900">
                    {testimonial.author.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.author.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="text-gray-800">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Ready To Sell More Online? You Need Great Images
              </h2>
              <p className="mt-6 text-gray-600">
                Entrust your product ranges to the team at our professional
                ecommerce photography studio. Get in touch today for a free,
                no-obligation quote.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href="mailto:Info@Portfolio.Com"
                  className="flex items-center group"
                >
                  <Mail />
                  <span className="ml-3 font-semibold group-hover:text-red-600 transition-colors">
                    info@aestheticeurasia.com
                  </span>
                </a>
                <a
                  href="tel:+8801970831822"
                  className="flex items-center group"
                >
                  <Phone />
                  <span className="ml-3 font-semibold group-hover:text-red-600 transition-colors">
                    +880 1970-831822
                  </span>
                </a>
              </div>
            </div>

            {/* --- Contact Form --- */}
            <div id="booking">
              <BookASlotForm />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white mb-20">
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

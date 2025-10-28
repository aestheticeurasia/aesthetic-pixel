"use client";
import {
  ArrowRight,
  Check,
  Loader2Icon,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Star,
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
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Marquee from "react-fast-marquee";
import ServicesComponents from "./services";

const brands = [
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
];

const workSteps = [
  {
    number: "01",
    title: "YOUR ORDER",
    description: "Place an order online and box up your items ready for collection",
  },
  {
    number: "02",
    title: "WE COLLECT",
    description: "Collection and delivery is free, just let us know where you are and what date you want your items collecting.",
  },
  {
    number: "03",
    title: "WE SHOOT",
    description: "Our specialist team works their magic to make your products look amazing, with a quality guarantee on all your images.",
  },
  {
    number: "04",
    title: "WE DELIVER",
    description: "We'll deliver your amazing new product photos and return your items back to you.",
  },
];

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
];

const CogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m0 0V3m0 0V2.25m0 0C10.995 2.25 10.125 3.124 10.125 4.125v6.75C10.125 11.875 10.995 12.75 12 12.75m0 0v6.75m0 0c1.005 0 1.875.874 1.875 1.875V21.75m0 0c0 .93-.87 1.687-1.875 1.687m-1.875-1.688V19.5m-1.875 1.688c-.93 0-1.687-.87-1.687-1.875m0 0v-6.75m0 0c-.93 0-1.687-.87-1.687-1.875V3.75m0 0c0-1.005.87-1.875 1.875-1.875M12 2.25v1.5m0 16.5v1.5m0 0c1.005 0 1.875.874 1.875 1.875V21.75m0 0c0 .93-.87 1.687-1.875 1.687m-1.875-1.688V19.5m-1.875 1.688c-.93 0-1.687-.87-1.687-1.875m0 0v-6.75m0 0c-.93 0-1.687-.87-1.687-1.875V3.75m0 0c0-1.005.87-1.875 1.875-1.875"
    />
  </svg>
);

const features = [
  "Turn Your Ordinary Product Into Extraordinary Photos",
  "Stronger Customer Connection Through Impactful Visuals.",
  "Our Photography Style Drives Your Business Sales",
];
const testimonials = [
  {
    rating: 5,
    text: "I have been taking gym and fitness training here since a long time and I found here so much easy, comfort and flexibility. The mentors are so good and they train me very well.",
    author: {
      name: "Jhon Stokes",
      title: "Founder",
      imageSrc: "/client1.svg",
    },
  },
  {
    rating: 5,
    text: "I have been taking gym and fitness training here since a long time and I found here so much easy, comfort and flexibility. The mentors are so good and they train me very well.",
    author: {
      name: "Jhon Stokes",
      title: "Founder",
      imageSrc: "/client2.svg",
    },
  },
];

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

export default function Banner() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "241e599a-7dc1-4ecf-9d6f-ded6ddd0a9cd");
    form.append("name", name);
    form.append("email", email);
    form.append("phone", phone);
    form.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        toast.success("Message sent successfully!");
        // Clear form fields
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus(result.message || "There was an error sending your message.");
      }

      setLoading(false);

      // Hide status after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred");
      setLoading(false);

      setTimeout(() => {
        setStatus(null);
      }, 10000);
    }
  };

  //carousel play
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <div>
      {/* Slider */}
      <section className="lg:py-[80px] py-10 px-6 bg-[#f8f7fa] dark:bg-black">
        <Marquee pauseOnHover={true} speed={90} direction="left">
          {brands.map((brand, index) => (
          <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                key={index}
                width={199}
                height={133}
                className="w-[199px] h-[133px] object-contain"
              />
          ))}
        </Marquee>
      </section>
      {/* Services Section Pinterest Grid */}
      <section className="bg-gray-50 font-sans py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Our Comprehensive Services
          </h2>
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
            <ServicesComponents />
          </div>
        </div>
      </section>
      {/* Works Steps Section */}
      <section className="bg-[#f8f7fa] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-16 text-center text-gray-800">
            Simple Steps of Work
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative flex items-center justify-center min-h-[450px]">
              <Image
                src="/gridBanner.png"
                alt="Garments on chair"
                width={350}
                height={450}
                className="absolute top-0 left-0 w-3/4 max-w-xs z-10"
              />

              <Image
                src="/gridBanner2.png"
                alt="Photo studio"
                width={400}
                height={270}
                className="absolute bottom-0 right-0 w-4/5 max-w-md rounded-lg shadow-xl border-4 md:border-8 border-white"
              />
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-0.5  z-0" />

              <div className="space-y-8">
                {workSteps.map((step) => (
                  <div
                    key={step.number}
                    className="flex items-start relative z-10"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-gray-700 shadow-md">
                      {step.number}
                    </div>

                    <div className="ml-6 pt-1.5">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full container mx-auto px-4 mb-16 md:mb-24">
        <div className="relative h-0 w-full pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 h-full w-full rounded-lg"
            src="https://www.youtube.com/embed/LgeiCnirTzs?si=8uN7AVfWyRxOmjvW"
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

                <div className="bg-red-600 rounded-br-lg flex items-center justify-center p-4 space-x-3 shadow-lg">
                  <div className="flex-shrink-0">
                    <CogIcon />
                  </div>
                  <div className="text-white">
                    <p className="text-3xl lg:text-4xl font-bold">25+</p>
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

              <p className="mt-4 text-gray-700">
                We are just a step away from you. Our photography services are
                designed to bring out the best in your product photos. Along
                with the latest
              </p>
              <p className="mt-4 text-sm text-gray-600">
                technology and techniques, our experienced photographer and
                in-house expert retouching team ensure your product photo looks
                its best, delivering exceptional results for your business.
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

              <a
                href="#"
                className="mt-8 inline-flex items-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                Discover More
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            See Our Portfolios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <div className="md:col-span-1 md:row-span-2">
              <Image
                src="/portfolioB1.png"
                alt="Woman with headset working"
                width={400}
                height={600}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <Image
                src="/portfolioB2.png"
                alt="Man in Puma hoodie"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            <div>
              <Image
                src="/portfolioB3.png"
                alt="Product on orange background"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>

            <div>
              <Image
                src="/portfolioB4.png"
                alt="Pink sofa in living room"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>

            <div>
              <Image
                src="/portfolioB5.png"
                alt="Cocktail glass with lemons in blue room"
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Discover More
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white mb-20">
        <div className="container mx-auto max-w-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4 "
            defaultValue="item-1"
          >
            {faqItems.map((item) => (
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
                      <Star key={i} />
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
            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Enter Subject"
                      required
                      className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter Phone"
                      required
                      className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <textarea
                    name="message"
                    placeholder="Write a Message"
                    rows={5}
                    required
                    className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center bg-red-600 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2Icon className="animate-spin font-bold" />{" "}
                        &nbsp; Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center font-bold">
                        <Send /> &nbsp; Send Message
                      </span>
                    )}
                  </button>
                  <AnimatePresence>
                    {status && (
                      <motion.div
                        key={status}
                        className="text-center mt-5 overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <p className="font-bold">{status}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
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
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1.5">
                            {/* Replaced UserIcon */}
                            <User className="w-4 h-4" />
                            <span>By {blog.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4" />
                            <span>1 Comment</span>
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
                          Learn More
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

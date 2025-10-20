"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Camera,
  Layers3,
  Briefcase,
  Lightbulb,
  Zap,
  Package,
  Phone,
  Send,
  Calendar as CalendarIcon,
  Users,
  Star,
  Award,
  Cpu,
  Edit3,
  Smile,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const features = [
  {
    icon: Package,
    title: "Product Photography",
    tag: "Product",
    desc: "Optimized product photos sized and edited for online listings and ads.",
    img: "/product.jpg",
  },
  {
    icon: Layers3,
    title: "Apparel and Garments Photography",
    tag: "Apparel",
    desc: "Lifestyle shoots that connect your products with real-life moments.",
    img: "/garments.jpg",
  },
  {
    icon: Briefcase,
    title: "Fashion & Model Photography",
    tag: "Fashion",
    desc: "Headshots, facility photography and editorial assets for comms.",
    img: "/carousel3.jpg",
  },
  {
    icon: Camera,
    title: "Furniture & Interior Photography",
    tag: "Furniture",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
    img: "/furniture.jpg",
  },
  {
    icon: Lightbulb,
    title: "Lifestyle & Branding Photography",
    tag: "Lifestyle",
    desc: "Concept, styling and art direction to fit your brand voice.",
    img: "/branding.jpg",
  },
  {
    icon: Zap,
    title: "Photo Editing & Retouching Services",
    tag: "Retouching",
    desc: "Clear timelines and reliable delivery without compromising quality.",
    img: "/retouching.jpg",
  },
];

const testimonials = [
  {
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    name: "Emily Johnson",
    role: "Head of Marketing",
    quote:
      "Incredible attention to detail. Delivered beautiful shots that lifted our conversion rate.",
  },
  {
    img: "/testimonial-rafi.jpg",
    name: "Rafi Ahmed",
    role: "E-commerce Manager",
    quote:
      "Professional, on-time, and the images looked better than imagined.",
  },
  {
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=80",
    name: "Maya Roy",
    role: "Founder",
    quote:
      "Great creative direction — they understood our brand immediately.",
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    name: "Michael Brown",
    role: "Brand Strategist",
    quote:
      "Their photography gave our catalog a premium and cohesive feel. Highly recommended!",
  },
  {
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    name: "Sophia Miller",
    role: "Creative Director",
    quote:
      "The team was cooperative, creative, and fast. Our visuals now truly represent our brand.",
  },
  {
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
    name: "Ethan Davis",
    role: "Product Manager",
    quote:
      "Exceptional experience from start to finish. Their product shots exceeded expectations.",
  },
];


const CarouselImg = [
  {
    imgUrl: "/carousel1.jpg",
  },
  {
    imgUrl: "/carousel2.jpg",
  },
  {
    imgUrl: "/carousel3.jpg",
  },
];

const BookASlot = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bookingDate: "",
    project: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [today, setToday] = useState("");
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(null);
  const [bookingDatePopoverOpen, setBookingDatePopoverOpen] = useState(false);

  useEffect(() => {
    setToday(dayjs().format("D MMM YYYY"));
  }, []);

  useEffect(() => {
    if (bookingDate) {
      setFormData((prev) => ({
        ...prev,
        bookingDate: format(bookingDate, "d-MMM-yyyy"),
      }));
    }
  }, [bookingDate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f2a40982-3c74-465e-875c-1f699faf49b1",
          subject: "New Booking Inquiry",
          sender_name: formData.name,
          sender_email: formData.email,
          phone: formData.phone,
          bookingDate: formData.bookingDate,
          message: formData.project,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmissionMessage(
          "Thank you! We received your inquiry and will be in touch within 24 hours."
        );
        setFormData({
          name: "",
          phone: "",
          email: "",
          bookingDate: "",
          project: "",
        });
        setBookingDate(undefined);
      } else {
        setSubmissionMessage(
          "Oops! Something went wrong. Please try again later."
        );
      }
    } catch (err) {
      console.error(err);
      setSubmissionMessage("Network error! Please try again later.");
    }
    setIsSubmitting(false);
  };

  // scroll to booking form
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // scroll to services
  const scrollToServices = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <main className="min-h-screen bg-[#edeef0] text-black font-sans">
      {/* ---------- HERO ---------- */}
      <section className="relative bg-black text-white">
        <div className="container mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <Camera className="w-10 h-10 text-red-600 bg-white rounded-full p-2" />
              <span className="text-sm uppercase font-semibold tracking-wider text-red-500">
                Commercial Photography
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              The Imagery Your Brand{" "}
              <span className="text-red-600 landing-page-title-font">
                Deserves
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mb-6">
              High-impact commercial photography — from product detail to
              full-scale lifestyle shoots. Build trust, increase conversions,
              and tell your brand story visually.
            </p>

            <div className="flex gap-4">
              <Button
                onClick={scrollToBooking}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 cursor-pointer"
              >
                Booking Inquiry
              </Button>

              <a
                onClick={scrollToServices}
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-3 border border-white/10 rounded-md hover:bg-white/5 cursor-pointer"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-red-600" />
                <div>
                  <div className="text-sm font-semibold">Clients Served</div>
                  <div className="text-xs text-gray-300">+120 brands</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-sm font-semibold">Avg. Rating</div>
                  <div className="text-xs text-gray-300">4.9/5</div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel*/}
          <div className="w-full overflow-hidden rounded-lg">
            <Carousel
              plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent>
                {CarouselImg.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={item.imgUrl}
                        alt={`carousel-${index}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* ---------- HIGHLIGHT STRIP ---------- */}
      <section className="py-10 bg-[#f9f9f9] border-y border-gray-200">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-x-14 gap-y-4 text-center md:text-left">
            {[
              { icon: Award, text: "Award-Winning Photographer" },
              { icon: Cpu, text: "Modern Technology" },
              { icon: Edit3, text: "In-House Editing Team" },
              { icon: Smile, text: "Satisfaction Guaranteed" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-gray-800 hover:text-red-600 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 text-red-500 shrink-0" />
                <span className="font-semibold tracking-wide text-base md:text-lg relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all hover:after:w-full">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          {/* <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-tl from-red-700 via-pink-500 to-purple-900 bg-clip-text text-transparent">
            STUNNING IMAGERY IS WHAT WE DO
          </h2> */}
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 text-center">
            Stunning Imagery Is {""}
            <span className="text-red-600 landing-page-title-font">
              What We Do
            </span>
          </h1>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            A full-suite offering for brands of every size — tailored shoots,
            creative direction and rapid delivery.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="relative group overflow-hidden rounded-sm shadow-sm cursor-pointer"
                onClick={() =>
                  setOpenFeatureIndex(openFeatureIndex === idx ? null : idx)
                }
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className={`object-cover group-hover:scale-110 w-full h-72 transition-transform duration-700 ${
                    openFeatureIndex === idx ? "scale-110" : ""
                  }`}
                />

                {/* Tag on bottom-left corner */}
                <span className="absolute left-2 bottom-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {item.tag}
                </span>

                {/* Overlay */}
                <div
                  className={`absolute inset-x-0 bottom-0 bg-black/70 text-white px-5 py-5 flex flex-col justify-center transition-all duration-500 ease-out ${
                    openFeatureIndex === idx
                      ? "translate-y-[5%]" // visible
                      : "translate-y-full" // hidden
                  } group-hover:translate-y-[5%]`}
                >
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 text-center">
            What Clients {""}
            <span className="text-red-600 landing-page-title-font">Say</span>
          </h1>
          <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
            Real feedback from real projects — three highlights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <aside
                key={i}
                className="bg-white text-black rounded-xl p-6 shadow-lg transform hover:-translate-y-2 transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-600">{t.role}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-700">“{t.quote}”</p>
              </aside>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BOOKING FORM + FAQ ---------- */}
      <section id="booking" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Left: Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-4">
                Fast-Track Booking Inquiry
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Fill in the details and we’ll get back to you within 24 hours.
              </p>

              {/* ---------- FORM ---------- */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 flex flex-col flex-grow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1XXXX XXXXX"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Booking Date
                    </label>

                    <Popover
                      open={!!bookingDatePopoverOpen}
                      onOpenChange={(state) => setBookingDatePopoverOpen(state)}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left flex items-center",
                            !bookingDate && "text-gray-400",
                            "cursor-pointer"
                          )}
                        >
                          {bookingDate
                            ? format(bookingDate, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={bookingDate}
                          onSelect={(date) => {
                            setBookingDate(date);
                            setBookingDatePopoverOpen(false); // Close popover
                          }}
                          disabled={(date) => date < new Date()}
                          className="cursor-pointer"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details
                  </label>
                  <Textarea
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    rows={4}
                    className="flex-1"
                  />
                </div>

                {submissionMessage && (
                  <div className="mt-4 p-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                    {submissionMessage}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white mt-auto cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Right: FAQ Accordion */}
            <div className="flex flex-col h-full gap-4">
              <h2 className="text-2xl font-bold mb-1">
                Frequently Asked Questions
              </h2>

              <Accordion
                type="single"
                collapsible
                className="flex flex-col gap-3"
              >
                {[
                  {
                    question: "What types of products do you photograph?",
                    answer:
                      "We provide professional photography for all types of products, except for model photography. Our specialties include apparel, fashion accessories, footwear, furniture, home décor, electronics, cosmetics, and more.",
                  },
                  {
                    question:
                      "Do you offer image retouching and editing services?",
                    answer:
                      "Yes! Every image we deliver goes through a professional editing process — including color correction, background removal, shadow creation, and overall enhancement to ensure your visuals look premium and consistent.",
                  },
                  {
                    question:
                      "Can I ship my products to your studio for photography?",
                    answer:
                      "Yes, you can send your products directly to our studio address. Once the shoot is completed, we’ll safely return your items as per your instructions.",
                  },
                  {
                    question:
                      "Do you provide ghost mannequin or flat-lay photography?",
                    answer:
                      "Yes, we specialize in ghost mannequin, flat-lay, and hanging apparel photography — ideal for e-commerce and catalog presentation.",
                  },
                  {
                    question:
                      "Can I review and approve sample shots before the full shoot?",
                    answer:
                      "Of course! We always send sample images for your approval before completing the full project to ensure we’re aligned with your expectations.",
                  },
                ].map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx + 1}`}
                    className="rounded-xl shadow-lg bg-gray-50"
                  >
                    <AccordionTrigger
                      className="text-lg font-semibold mb-0 cursor-pointer hover:underline-none focus:underline-none p-4"
                      style={{ textDecoration: "none" }}
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="mt-0 text-sm text-gray-700 p-4 pt-0">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Call Center */}
      <section className="pb-20 bg-white">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-center py-10">
          Call For {""}
          <span className="text-red-600 landing-page-title-font">Inquiry</span>
        </h1>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-25 items-center">
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/call-center.jpg"
                alt="Call Center"
                width={500}
                height={500}
                className="rounded-xl object-cover shadow-lg"
              />
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <div className="flex flex-col items-center space-y-6">
                {/* Ripple Phone Icon */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Smooth Ripple Effect */}
                  <span className="absolute w-full h-full rounded-full bg-red-500/30 animate-ping"></span>
                  <span className="absolute w-3/4 h-3/4 rounded-full bg-red-500/20 animate-ping delay-200"></span>
                  <span className="absolute w-1/2 h-1/2 rounded-full bg-red-500/10 animate-ping delay-400"></span>

                  {/* Phone Icon */}
                  <a href="tel:+8801711205200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative h-10 w-10 text-red-600 z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 
          1 0 011.11-.21c1.21.48 2.53.74 3.88.74a1 1 0 011 1V20a1 1 0 
          01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 
          1.35.26 2.67.74 3.88a1 1 0 01-.21 1.11l-2.41 2.41z"
                      />
                    </svg>
                  </a>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col items-center">
                  <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">
                    Call Now
                  </p>
                  <a
                    href="tel:+8801711205200"
                    className="text-4xl sm:text-5xl font-extrabold text-red-600 hover:text-red-700 transition-colors duration-300 whitespace-nowrap"
                  >
                    +880&nbsp;1711&nbsp;205200
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} Aesthetic Pixels Studio — All rights
            reserved.
          </div>

          <div className="flex items-center gap-4">
            <a className="text-sm hover:underline" href="/privacy">
              Privacy Policy
            </a>
            <span className="opacity-40">|</span>
            <a className="text-sm hover:underline" href="/terms">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default BookASlot;

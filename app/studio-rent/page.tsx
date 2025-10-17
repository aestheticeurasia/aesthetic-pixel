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

const StudioRent = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rentingHour: "",
    bookingDate: "",
    project: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [today, setToday] = useState("");
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
          access_key: "cf7ea563-c1a8-473a-b2fb-554b4d2dc8d4",
          subject: "Studio Rent",
          sender_name: formData.name,
          phone: formData.phone,
          bookingDate: formData.bookingDate,
          hour_needed: formData.rentingHour,
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
          rentingHour: "",
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

  return (
    <main className="min-h-screen bg-[#edeef0] text-black font-sans">
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-16 md:py-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: "url('/quoteBg.jpeg')",
            filter: "brightness(0.5)",
          }}
          aria-hidden="true"
        ></div>

        <div className="relative z-10 container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-white p-6 rounded-xl md:p-0">
            <Camera className="w-12 h-12 text-white mb-4 p-2 bg-red-600 rounded-full" />
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 text-black">
              The Space Your Creativity{" "}
              <span className="text-red-600 landing-page-title-font">
                Deserves
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-8">
              Specializing in high-impact commercial photography that captures
              defining moments and drives audience engagement.
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-800/80 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg lg:max-w-none mx-auto">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
              Studio Rent Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="text-gray-100"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-300" />
                    </div>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXXX XXXXX"
                      className="pl-10 text-gray-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hour */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Renting Hour
                  </label>
                  <Input
                    type="number"
                    name="rentingHour"
                    min={2}
                    value={formData.rentingHour}
                    onChange={handleChange}
                    placeholder="How many hour you need?"
                    className="text-gray-100"
                  />
                </div>

                {/* Booking Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
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
                          "w-full pl-3 text-left flex items-center bg-transparent text-gray-300",
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
                        className="cursor-pointer bg-transparent"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project Details
                </label>
                <Textarea
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Your Message..."
                  rows={4}
                  className=" text-gray-100"
                />
              </div>

              {submissionMessage && (
                <div className="mt-4 p-4 text-sm font-medium text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                  {submissionMessage}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
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
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 text-center">
            <span className="text-red-600 landing-page-title-font">
              What We Serve
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
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="object-cover h-72 w-full transition-transform duration-700 group-hover:scale-110"
                />

                {/* Tag */}
                <span className="absolute left-2 bottom-2 bg-black/70 text-white text-xl font-bold px-2 py-1 rounded">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------  FAQ ---------- */}
      <section id="booking" className="py-10 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 items-stretch">
            {/* Right: FAQ Accordion */}
            <div className="flex flex-col h-full gap-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-center py-10">
                Frequently Asked {""}
                <span className="text-red-600 landing-page-title-font">
                  Questions
                </span>
              </h1>

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

export default StudioRent;

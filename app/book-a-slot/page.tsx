"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Camera,
  Layers3,
  Briefcase,
  Lightbulb,
  Zap,
  CheckCircle,
  Package,
  Phone,
  Send,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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

// Specialties data
const specialties = [
  {
    icon: Package,
    title: "Product & E-commerce",
    description:
      "High-resolution, detail-focused shots optimized for online listings, catalogs, and advertising campaigns.",
  },
  {
    icon: Layers3,
    title: "Brand Lifestyle",
    description:
      "Authentic, story-driven imagery that showcases your products in relatable, real-world scenarios and environments.",
  },
  {
    icon: Briefcase,
    title: "Corporate & Editorial",
    description:
      "Professional headshots, facility tours, and documentary photography for annual reports, websites, and press releases.",
  },
];

// Workflow data
const workflow = [
  {
    step: 1,
    icon: Lightbulb,
    title: "Consultation & Concept",
    description:
      "We meet to understand your brand vision, target audience, and specific project goals.",
  },
  {
    step: 2,
    icon: Zap,
    title: "Shoot & Production",
    description:
      "Our team handles all logistics, from location scouting to professional styling and lighting direction.",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Refinement & Delivery",
    description:
      "We deliver a curated set of high-resolution, professionally retouched images within the agreed timeline.",
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
  const [today, setToday] = useState("");
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setToday(dayjs().format("YYYY-MM-DD"));
  }, []);

  // Sync date picker value to formData
  useEffect(() => {
    if (bookingDate) {
      setFormData((prev) => ({
        ...prev,
        bookingDate: format(bookingDate, "yyyy-MM-dd"),
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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Hero Section */}
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
            <Camera className="w-12 h-12 text-white mb-4 p-2 bg-indigo-600 rounded-full" />
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tighter">
              The Imagery Your Brand{" "}
              <span className="text-indigo-400">Deserves</span>
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-8">
              Specializing in high-impact commercial photography that captures
              defining moments and drives audience engagement.
            </p>
            <p className="hidden lg:block text-sm font-semibold text-indigo-200">
              Fill out the fast-track form opposite to begin your project
              consultation.
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg lg:max-w-none mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Fast-Track Booking Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                    </div>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXXX XXXXX"
                      className="pl-10 dark:bg-gray-700 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@domain.com"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>

                {/* Booking Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Booking Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left dark:bg-gray-700 dark:text-gray-100",
                          !bookingDate && "text-gray-400"
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
                        onSelect={setBookingDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Details
                </label>
                <Textarea
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Your Message..."
                  rows={4}
                  className="dark:bg-gray-700 dark:text-gray-100"
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
                className="w-full flex items-center justify-center"
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
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
            Our Commercial Specialties
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            From studio product shots to dynamic on-location brand narratives,
            we cover the full spectrum of commercial needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {specialties.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-500 transform hover:-translate-y-1"
              >
                <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
            A Seamless Creative Process
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Our structured approach ensures clarity, efficiency, and results
            that exceed expectations.
          </p>
          <div className="relative flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 md:space-x-12">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-indigo-200 dark:bg-indigo-700 mx-10"></div>
            {workflow.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center p-4 md:w-1/3"
              >
                <div className="flex items-center justify-center w-20 h-20 mb-6 bg-indigo-600 text-white rounded-full shadow-xl z-10 border-4 border-white">
                  <item.icon className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-indigo-600 mb-2">
                  STEP {item.step}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookASlot;

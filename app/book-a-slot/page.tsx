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
  Users,
  Star,
  Heart,
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
    title: "E-commerce Ready",
    desc: "Optimized product photos sized and edited for online listings and ads.",
  },
  {
    icon: Layers3,
    title: "Brand Storytelling",
    desc: "Lifestyle shoots that connect your products with real-life moments.",
  },
  {
    icon: Briefcase,
    title: "Corporate Imagery",
    desc: "Headshots, facility photography and editorial assets for comms.",
  },
  {
    icon: Camera,
    title: "Studio Excellence",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
  },
  {
    icon: Lightbulb,
    title: "Creative Direction",
    desc: "Concept, styling and art direction to fit your brand voice.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "Clear timelines and reliable delivery without compromising quality.",
  },
];

const testimonials = [
  {
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    name: "Sarah Khan",
    role: "Head of Marketing",
    quote:
      "Incredible attention to detail. Delivered beautiful shots that lifted our conversion rate.",
  },
  {
    img: "https://images.unsplash.com/photo-1545996124-1b1a1a8f6f90?w=400&q=80",
    name: "Rafi Ahmed",
    role: "E-commerce Manager",
    quote: "Professional, on-time, and the images looked better than imagined.",
  },
  {
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=80",
    name: "Maya Roy",
    role: "Founder",
    quote: "Great creative direction — they understood our brand immediately.",
  },
];

const workflow = [
  {
    step: 1,
    icon: Lightbulb,
    title: "Consultation & Concept",
    description:
      "We meet to understand your brand vision, target audience, and project goals.",
  },
  {
    step: 2,
    icon: Zap,
    title: "Shoot & Production",
    description:
      "End-to-end production: location, styling, equipment and direction handled.",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Refinement & Delivery",
    description:
      "Careful retouching and delivery of optimized assets for your channels.",
  },
];

const BookASlot = () => {
  // FORM STATE (kept identical to your logic)
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
              <span className="text-red-600">Deserves</span>
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
                href="#features"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-3 border border-white/10 rounded-md hover:bg-white/5"
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

          {/* YouTube*/}
          <div className="w-full rounded-lg overflow-hidden ">
            <iframe
              title="APS"
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/h8aFRD-jGbI?autoplay=1&mute=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            A full-suite offering for brands of every size — tailored shoots,
            creative direction and rapid delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="group relative bg-black/5 dark:bg-white/2 p-6 rounded-2xl border border-black/5 hover:shadow-2xl transform hover:-translate-y-2 transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-red-50 text-red-600 mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition">
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Clients Say
          </h2>
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

      {/* ---------- WORKFLOW ---------- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Our Process</h2>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {workflow.map((w, i) => (
              <div
                key={i}
                className="flex-1 bg-black text-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <w.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">STEP {w.step}</div>
                    <div className="font-bold">{w.title}</div>
                  </div>
                </div>

                <p className="text-sm text-gray-200">{w.description}</p>
              </div>
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

              <form
                onSubmit={handleSubmit}
                className="space-y-4 flex flex-col flex-grow"
              >
                {/* Name & Phone */}
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

                {/* Email & Date */}
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left",
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details
                  </label>
                  <Textarea
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    rows={4}
                  />
                </div>

                {/* Submission Message */}
                {submissionMessage && (
                  <div className="mt-4 p-4 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                    {submissionMessage}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white mt-auto"
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
            <div className="flex flex-col h-full">
              <Accordion
                type="single"
                collapsible
                className="bg-white p-8 rounded-xl shadow-lg flex-1"
              >
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold mb-2 cursor-pointer">
                    How are you?
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 text-sm text-gray-600">
                    We are great — focused on delivering quality photography.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold mb-2 cursor-pointer">
                    How do you do?
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 text-sm text-gray-600">
                    We plan, shoot, and retouch using a collaborative process to
                    fit your timeline and budget.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold mb-2 cursor-pointer">
                    Turnaround time?
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 text-sm text-gray-600">
                    Typically 3–7 business days for proofs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold mb-2 cursor-pointer">
                    Delivery & Payment
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 text-sm text-gray-600">
                    High-res JPEGs + web-ready versions. Invoice after delivery
                    / deposit options available.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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

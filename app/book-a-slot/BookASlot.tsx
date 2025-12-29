"use client";
import React, { useState } from "react";
import {
  Camera,
  Layers3,
  Briefcase,
  Lightbulb,
  Zap,
  Package,
  Star,
  CircleCheckBig,
  Phone,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookASlotForm from "../components/BookASlotForm";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    rating: 5,
  },
  {
    img: "/testimonial-rafi.jpg",
    name: "Rafi Ahmed",
    role: "E-commerce Manager",
    quote: "Professional, on-time, and the images looked better than imagined.",
    rating: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=80",
    name: "Maya Roy",
    role: "Founder",
    quote: "Great creative direction — they understood our brand immediately.",
    rating: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    name: "Michael Brown",
    role: "Brand Strategist",
    quote:
      "Their photography gave our catalog a premium and cohesive feel. Highly recommended!",
    rating: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    name: "Sophia Miller",
    role: "Creative Director",
    quote:
      "The team was cooperative, creative, and fast. Our visuals now truly represent our brand.",
    rating: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
    name: "Ethan Davis",
    role: "Product Manager",
    quote:
      "Exceptional experience from start to finish. Their product shots exceeded expectations.",
    rating: 5,
  },
];

const faqs = [
  {
    id: "1",
    question: "What types of shoots can I book Aesthetic Pixel Studio for?",
    answer:
      "We have experience across various industries including fashion, tech, lifestyle, and more. Our team adapts to the unique needs of each sector.",
  },
  {
    id: "2",
    question: "What equipment and props are included in the studio rental?",
    answer:
      "Our typical project turnaround time ranges from 2 to 4 weeks, depending on the complexity and scope of the project. We prioritize quality and timely delivery.",
  },
  {
    id: "3",
    question: "How can I book the studio and what is the payment process?",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
  },
  {
    id: "4",
    question:
      "What are your studio rental rates and available pricing packages?",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
  },
  {
    id: "5",
    question: "Can I bring my own team, camera and lighting setup",
    answer:
      "We offer up to three rounds of revisions to ensure the final product meets your expectations. Additional revisions may be subject to extra charges.",
  },
];

const clientDP = [
  {
    name: "Client 1",
    img: "/apsTeam/mdAshaduzzaman.jpg",
    size: "h-100 mt-10",
  },
  {
    name: "Client 2",
    img: "/apsTeam/jamirulIslam.jpg",
    size: "h-90",
  },
  {
    name: "Client 3",
    img: "/apsTeam/nazmusSakib.jpg",
    size: "h-100",
  },
];

const heroImg = [
  {
    name: "Client 1",
    img: "/bookingHero1.png",
    size: "h-100 mt-10",
  },
  {
    name: "Client 2",
    img: "/bookingHero3.png",
    size: "h-90",
  },
  {
    name: "Client 3",
    img: "/bookingHero2.png",
    size: "h-100",
  },
  {
    name: "Client 4",
    img: "/bookingHero4.png",
    size: "h-100 -mt-20",
  },
];

const BookASlot = () => {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col lg:flex-row pt-20 px-6 md:px-12 gap-8 items-stretch justify-center lg:px-[160px] bg-[url('/layoutComponents/bookingPage.svg')] bg-no-repeat bg-top-left">
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-xl">
            <Badge
              variant="outline"
              className="rounded-xl text-red-500 border-red-900 font-bold w-fit mb-6"
            >
              <GoDotFill className="mr-2" /> BOOKING OPEN
            </Badge>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Commercial
              <span className="text-[#f00004]"> Photography</span>
            </h1>

            <p className="text-[#7e7c83] text-lg mb-10">
              High-impact commercial photography — from product detail to
              full-scale lifestyle shoots. Build trust, increase conversions,
              and tell your brand story visually.
            </p>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
              <div className="flex flex-row gap-8 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-white font-bold text-3xl">+653</h1>
                  <p className="text-muted-foreground uppercase text-sm">
                    Brands Served
                  </p>
                </div>

                <div className="text-center lg:text-left">
                  <h1 className="text-white font-bold text-3xl">4.9/5</h1>
                  <p className="text-muted-foreground uppercase text-sm">
                    Google Avg. Rating
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                {clientDP.map((dp, index) => (
                  <Image
                    key={index}
                    src={dp?.img}
                    alt="Client avatar"
                    width={55}
                    height={55}
                    className="rounded-full border-2 border-[#f00004] -mr-3 last:mr-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-4 flex flex-col justify-center items-center lg:items-start">
          {heroImg.map((feature, index) => (
            <Image
              key={index}
              src={feature.img}
              alt={feature.name}
              width={330}
              height={400}
              className={`${feature.size} rounded-2xl object-cover opacity-85 hover:opacity-100 transition-opacity duration-500`}
            />
          ))}
        </div>
      </section>

      {/* Service */}
      <section className="pt-20 px-6 md:px-12 gap-8 justify-center lg:px-[160px]">
        <div className="flex lg:flex-row flex-col justify-center lg:justify-between items-center space-y-6 lg:space-y-0">
          <div className="text-center lg:text-start">
            <h1 className="font-bold text-2xl text-white">
              Choose Your Service
            </h1>
            <p className="text-muted-foreground mt-2">
              Select the category that best fits your project needs.
            </p>
          </div>
          <div className="flex gap-6 items-center justify-center">
            <span className="flex gap-2">
              <CircleCheckBig className="text-[#ef4444]" />
              <p className="text-muted-foreground uppercase">Mordern Tech</p>
            </span>
            <span className="flex gap-2">
              <CircleCheckBig className="text-[#ef4444]" />
              <p className="text-muted-foreground uppercase">
                In-house Editing
              </p>
            </span>
            <span className="flex gap-2">
              <CircleCheckBig className="text-[#ef4444]" />
              <p className="text-muted-foreground uppercase">Guranteed</p>
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7 mt-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-[#0b0b0c] border-[#171718] border-1"
            >
              <CardHeader>
                <div className="">
                  <feature.icon className="text-muted-foreground w-12 h-12 p-3 rounded-xl bg-[#18181b]" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <h1 className="text-white font-bold text-lg">
                  {feature.title}
                </h1>
                <p className="text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="pt-20 px-6 md:px-12 gap-8 lg:px-[160px] mb-20 flex justify-center items-center bg-[url('/layoutComponents/bookingPageForm.svg')] bg-no-repeat bg-bottom-left">
        <div className="bg-[#141417] text-white max-w-3xl rounded-xl border-[#2c2b2e] border">
          <BookASlotForm />
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 md:px-12 gap-8 justify-center lg:px-[160px]">
        <div className="space-y-2 text-center lg:text-start mb-8 lg:mb-3">
          <p className="text-[#ef4444] uppercase font-bold text-sm">
            Real Feedback
          </p>
          <h1 className="font-bold text-2xl text-white">
            What Our Clients Say
          </h1>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={index}
              className="bg-[#0b0b0c] border-[#171718] border-1"
            >
              <CardHeader>
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
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-6">
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="gap-4">
                <div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.img} alt={testimonial.name} />
                    <AvatarFallback className="bg-[#27272a] text-white">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h1 className="text-white text-md font-bold">
                    {testimonial.name}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      {/* FAQ */}
      <section className="mt-5 px-4 sm:px-8 lg:px-20 xl:px-[160px] bg-[url('/layoutComponents/3rdBlur.svg')] bg-no-repeat bg-right-top">
        <div className="lg:py-[48px] px-3 lg:px-[232px] pb-10 md:pb-0">
          <h1 className="text-white text-2xl lg:text-4xl font-bold text-center mb-10">
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

      {/* Footer */}
      <section className="mb-10 px-4 sm:px-8 lg:px-20 xl:px-[160px] bg-[url('/layoutComponents/hireStudioFooterBlur.svg')] bg-no-repeat bg-left-bottom">
        <div className="border-1 border-[#430c0c] p-10 rounded-xl">
          <div className="flex lg:flex-row flex-col justify-between items-center">
            <div className="flex lg:flex-row flex-col lg:gap-50 justify-center items-center">
              <div className="flex flex-col items-center justify-center lg:items-start">
                <Image
                  src="/logoDark.png"
                  alt="Studio Hire Footer"
                  width={100}
                  height={100}
                  className="object-cover"
                />
                <p className="text-muted-foreground w-50">
                  Aesthetic Pixels Studio. Visuals that ignite sales.
                </p>
              </div>
              <div className="text-center lg:text-start lg:mt-0 mt-8">
                <h1 className="text-white font-bold text-xl mb-3">Contact</h1>
                <a href="tel:+8801711205200">
                  <div className="border-2 border-[#181819]  bg-[#0c0c0d] rounded-xl p-3">
                    <div className="flex justify-between items-center gap-6">
                      <div className="rounded-lg border-2 border-[#dc2626] bg-[#231010] p-3">
                        <Phone className="text-[#dc2626]" />
                      </div>
                      <div>
                        <h3 className="uppercase font-bold text-white">
                          Call Now
                        </h3>
                        <span className="font-bold text-[#dc2626]">
                          +880 1711 205200
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="text-center lg:text-end mt-8 lg:mg-0">
              <h1 className="text-white mb-3">Ready to start your project?</h1>
              <Button className="bg-white text-primary font-bold rounded-3xl hover:bg-amber-100 cursor-pointer">
                Get a free Quote
              </Button>
            </div>
          </div>
          <hr className="my-10 border-[#0f0e0e]" />
          <div className="flex lg:flex-row flex-col justify-between items-center">
            <p className="text-muted-foreground lg:text-start text-center">
              © 2025 Aesthetic Pixels Studio — All rights reserved.
            </p>
            <span className="text-muted-foreground flex justify-between items-center gap-4 mt-5 lg-mt-0">
              <h5>Privacy Policy</h5>
              <h5 className="text-muted-foreground">|</h5>
              <h5>Terms & Conditions</h5>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookASlot;

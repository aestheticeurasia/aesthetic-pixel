import React from "react";
import {
  Camera,
  Layers3,
  Briefcase,
  Lightbulb,
  Zap,
  Package,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import RentForm from "../components/RentForm";

const features = [
  {
    icon: Layers3,
    title: "Backdrop",
    type: "video",
    tag: "Backdrop",
    desc: "Lifestyle shoots that connect your products with real-life moments.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761120025/Backdrop_wzq4fv.mp4",
  },
  {
    icon: Briefcase,
    title: "Changing-Room",
    type: "video",
    tag: "Changing Room",
    desc: "Headshots, facility photography and editorial assets for comms.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761213010/Studio_changing_room_vxdimj.mp4",
  },
  {
    icon: Camera,
    title: "Lighting Setup",
    type: "video",
    tag: "Lighting Setup",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761120027/Lighting-Setup_r6kgt8.mp4",
  },
  {
    icon: Lightbulb,
    title: "Mackup Room",
    type: "video",
    tag: "Mackup Room",
    desc: "Concept, styling and art direction to fit your brand voice.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/video/upload/v1761120037/Mackup-Room_aocn8c.mp4",
  },
  {
    icon: Package,
    title: "Additional Colored-Backdrop",
    type: "image",
    tag: "Additional Colored-Backdrop",
    desc: "Optimized product photos sized and edited for online listings and ads.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/image/upload/v1761120010/Additional-Colored-Backdrop_wx2dgb.jpg",
  },
  {
    icon: Zap,
    title: "Studio Propos",
    type: "image",
    tag: "Studio Propos",
    desc: "Clear timelines and reliable delivery without compromising quality.",
    img: "https://res.cloudinary.com/aesthetic-pixel-studio/image/upload/v1761120038/Studio-Propos_mt6v4d.jpg",
  },
];

const StudioRent = () => {
  return (
    <main className="min-h-screen bg-[#edeef0] text-black font-sans">
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
          <div className="text-center md:text-left text-white p-6 rounded-xl md:p-0">
            <div className="flex justify-center md:justify-start">
              <Camera className="w-12 h-12 text-white mb-4 p-2 bg-red-600 rounded-full" />
            </div>
            <h1 className="text-7xl sm:text-7xl font-extrabold leading-tight mb-4 text-white landing-page-title-font">
              Your Vision
              <span className="block sm:hidden"></span>
              <span className="hidden sm:inline"> </span>
              Our{" "}
              <span className="text-red-600 landing-page-title-font">
                Space
              </span>
            </h1>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 text-white landing-page-title-font">
              Perfect Studio for
              <span className="block sm:hidden"></span>
              <span className="hidden sm:inline"> </span>
              Perfect{" "}
              <span className="text-red-600 landing-page-title-font">
                Shots
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-8">
              Rent the well-equipped, flexible studio designed for swift product
              shots and high-end photographic projects. Book your session today.
            </p>
          </div>

          {/* ---  TOP FORM --- */}
          <div className="bg-gray-800/80 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg lg:max-w-none mx-auto">
            <RentForm className="text-white" />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 text-black text-center landing-page-title-font">
            Studio{" "}
            <span className="text-red-600 landing-page-title-font">
              Features
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
                {item.type === "video" ? (
                  <video
                    src={item.img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover h-72 w-full transition-transform duration-700 group-hover:scale-110"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="object-cover h-72 w-full transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <span className="absolute left-2 bottom-2 bg-black/70 text-white text-xl font-bold px-2 py-1 rounded">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------  FAQ ---------- */}
      <section id="booking" className="pb-10 bg-gray-50">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-center pb-10 landing-page-title-font">
          Frequently Asked {""}
          <span className="text-red-600 landing-page-title-font">
            Questions
          </span>
        </h1>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="flex flex-col h-full gap-4">
              <Accordion
                type="single"
                collapsible
                className="flex flex-col gap-3"
              >
                {[
                  {
                    question:
                      "What types of shoots can I book Aesthetic Pixel Studio for?",
                    answer:
                      "Our studio is ideal for product photography, e-commerce shoots, apparel & fashion photography, creative content, and video production. We do not provide model photography services, but you are welcome to bring your own models or team.",
                  },
                  {
                    question:
                      "What equipment and props are included with the studio rental?",
                    answer:
                      "We provide professional lighting setups, multiple backdrops, reflectors, tripods, and styled props. You can also use our stools, platforms, and stair props to create diverse compositions. Additional gear may be available upon request.",
                  },
                  {
                    question:
                      "How can I book the studio and what is the payment process?",
                    answer:
                      "You can book directly through our website or contact us via WhatsApp or phone. Once your date and time are confirmed, a 50% advance payment is required to secure your slot. The remaining balance is payable on the day of the shoot.",
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
            <div className="flex flex-col h-full gap-4">
              <Accordion
                type="single"
                collapsible
                className="flex flex-col gap-3"
              >
                {[
                  {
                    question:
                      "What are your studio rental rates and available pricing packages?",
                    answer:
                      "Our rental rates depend on the duration and setup requirements. We offer both hourly and full-day packages to fit your needs. Please contact us for a custom quote based on your shoot type.",
                  },
                  {
                    question:
                      "Can I bring my own team, camera, and lighting setup?",
                    answer:
                      "Absolutely! You are welcome to bring your own crew, cameras, and lights. Our team will assist you with setup support and power connections to make your shoot smooth and professional.",
                  },
                  {
                    question:
                      "Where is Aesthetic Pixel Studio located and what are the operating hours?",
                    answer:
                      "We are conveniently located in 115 Senpara Parbata (3rd floor of Sheltech Rubynur), Begum Rokeya Avenue, Mirpur, Dhaka 1216, with ample parking and easy access. Our studio operates 7 days a week from 10:00 AM to 8:00 PM, and extended hours can be arranged upon request.",
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

      {/* --- BOTTOM FORM  --- */}
      <section className="pb-20 bg-white">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-center py-10 landing-page-title-font">
          Call For {""}
          <span className="text-red-600 landing-page-title-font">Inquiry</span>
        </h1>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-25 items-center">
            <div className="flex justify-center lg:justify-end">
              <div className=" p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg lg:max-w-none mx-auto">
                   <RentForm />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              {/* ... (Call Now section remains the same) ... */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
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

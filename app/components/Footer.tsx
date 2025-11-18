"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import HideOnRoutes from "./HideOnRoutes";

export default function Footer() {
  return (
    <HideOnRoutes routes={["/book-a-slot", "/studio-rent"]}>
      <div className="relative mt-10">
        <section className="relative z-10 bg-red-600 py-15 grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-7xl rounded-xl gap-8 px-4 md:px-9">
          <div className="flex justify-center md:justify-start">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <span className="absolute w-full h-full rounded-full bg-white/70 animate-ping"></span>
                <span className="absolute w-3/4 h-3/4 rounded-full bg-white/50 animate-ping delay-200"></span>
                <span className="absolute w-1/2 h-1/2 rounded-full bg-white/30 animate-ping delay-400"></span>
                <a href="tel:+8801711205200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative h-10 w-10 text-white z-10"
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
              <div className="flex flex-col items-center">
                <p className="text-white text-sm uppercase tracking-widest mb-1 text-center md:text-left">
                  Call Now
                </p>
                <a
                  href="tel:+8801711205200"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white hover:text-gray-200 transition-colors duration-300 whitespace-nowrap text-center md:text-left"
                >
                  +880&nbsp;1711&nbsp;205200
                </a>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left flex flex-col justify-center space-y-6 md:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
              Get One Stop Digital Solutions
              <br />
              Under One Roof
            </h1>

            <p className="text-gray-300 max-w-md mx-auto md:mx-0">
              Web Development, Creative Writing, Digital Marketing, Graphics &
              Video Editing, & so on..
            </p>

            <form
              action="#"
              className="mx-auto md:mx-0 max-w-lg w-full space-y-4"
            >
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="w-full py-3 sm:py-4 pl-4 sm:pl-6 pr-32 sm:pr-40 text-gray-800 bg-white rounded-full border-2 border-transparent focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 sm:right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white font-semibold px-4 sm:px-6 py-2.5 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 text-sm sm:text-base"
                >
                  Start Free Trial
                </button>
              </div>
            </form>
          </div>
        </section>
        <footer className="w-full bg-[#1e1e1e] text-white -mt-40 pt-50">
          <div className="container mx-auto flex flex-col md:flex-row gap-8 px-6 py-10 items-center md:items-start justify-between">
            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <div className="rounded-2xl shadow-lg w-full max-w-[320px] px-4 flex flex-col items-center md:items-start text-center md:text-left">
                <Image
                  src="/logoDark.png"
                  alt="Aesthetic Pixel Studio"
                  width={100}
                  height={80}
                  className="mb-4"
                />
                <p className="text-sm text-gray-300">
                  With 7 years of experience and a passionate team of 100+
                  professionals, APS specializes in product
                </p>
                <div className="flex space-x-6 mt-5 text-3xl text-white justify-center md:justify-start">
                  <a
                    href="https://www.linkedin.com/company/aesthetic-pixel-studio-llc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.facebook.com/aestheticpixelstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaFacebookSquare />
                  </a>
                  <a
                    href="https://www.youtube.com/@AestheticPixelStudioLLC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-red-600 transition-colors duration-300"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-xl font-bold pb-5">Quick Links</h3>
              <div className="flex flex-col space-y-2 text-gray-300">
                <a href="">About</a>
                <a href="">Features</a>
                <a href="">Pricing</a>
                <a href="">Portfolio</a>
                <a href="">Blog</a>
                <a href="">Contact</a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-xl font-bold pb-5">Services</h3>
              <div className="flex flex-col space-y-2 text-gray-300">
                <a href="">Apparel Photography</a>
                <a href="">Product Photography</a>
                <a href="">Photo Retouching</a>
                <a href="">Accesories Photography</a>
                <a href="">Amazon Infographics</a>
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-xl font-bold pb-5">Contact Details</h3>
                <div className="flex flex-col space-y-4 text-gray-300">
                  <span className="flex flex-row justify-center md:justify-start">
                    <span className="text-red-600">
                      <MapPin />
                    </span>
                    &nbsp; 115, Senpara Parbata, Mirpur 10,
                    <br />
                    &nbsp; Dhaka-1216, Bangladesh
                  </span>
                  <span className="flex flex-row justify-center md:justify-start">
                    <span className="text-red-600">
                      <Phone />
                    </span>
                    &nbsp; +880 1970-831822
                  </span>
                  <span className="flex flex-row justify-center md:justify-start">
                    <span className="text-red-600">
                      <Phone />
                    </span>
                    &nbsp; +880 1742-321304
                  </span>
                  <span className="flex flex-row justify-center md:justify-start">
                    <span className="text-red-600">
                      <Mail />
                    </span>
                    &nbsp;&nbsp;&nbsp; info@aestheticeurasia.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700">
            <div className="container mx-auto px-6 py-6 text-center">
              <span className="text-md text-gray-400 leading-relaxed">
                © 2025 Aesthetic Pixel Studio. All rights reserved by{" "}
                <a
                  className="font-semibold hover:underline flex items-center justify-center md:justify-center"
                  href="https://www.aestheticeurasia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/aelogo.png"
                    alt="Aesthetic Eurasia"
                    width={34}
                    height={34}
                    className="inline-block mr-2"
                  />
                  <span className="text-[#e81123]">Aesthetic</span>&nbsp;
                  <span className="text-white">Eurasia</span>
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </HideOnRoutes>
  );
}

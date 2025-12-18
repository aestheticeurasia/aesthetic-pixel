"use client";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import HideOnRoutes from "./HideOnRoutes";

export default function Footer() {
  return (
    <HideOnRoutes routes={["/book-a-slot", "/studio-rent"]}>
      <div className="mt-50">
        <footer className="w-full text-white">
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
                <p className="text-sm text-muted-foreground">
                  With 7 years of experience and a passionate team of 100+
                  professionals, APS specializes in product
                </p>
                <div className="flex space-x-6 mt-5 text-3xl text-white justify-center md:justify-start">
                  <button
                    className="
    w-12 h-12
    rounded-full
    flex items-center justify-center
    bg-[#27272A]
    text-gray-400
    transition-colors duration-300
    hover:bg-blue-600 hover:text-white
  "
                  >
                    <a
                      href="https://www.facebook.com/AestheticPixelStudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="FaceBook"
                    >
                      <FaFacebook />
                    </a>
                  </button>
                  <button
                    className="
    w-12 h-12
    rounded-full
    flex items-center justify-center
    bg-[#27272A]
    text-gray-400
    transition-colors duration-300
    hover:bg-pink-600 hover:text-white
  "
                  >
                    <a
                      href="https://www.instagram.com/AestheticPixelStudioLLC"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="instagram"
                    >
                      <FaInstagram />
                    </a>
                  </button>
                  <button
                    className="
    w-12 h-12
    rounded-full
    flex items-center justify-center
    bg-[#27272A]
    text-gray-400
    transition-colors duration-300
    hover:bg-red-600 hover:text-white
  "
                  >
                    <a
                      href="https://www.youtube.com/@AestheticPixelStudioLLC"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    >
                      <FaYoutube />
                    </a>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-xl font-bold pb-5">Quick Links</h3>
              <div className="flex flex-col space-y-2 text-muted-foreground group">
                <a className="hover:text-white" href="/about">About</a>
                <a className="hover:text-white" href="">Features</a>
                <a className="hover:text-white" href="">Pricing</a>
                <a className="hover:text-white" href="">Portfolio</a>
                <a className="hover:text-white" href="">Blog</a>
                <a className="hover:text-white" href="">Contact</a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-xl font-bold pb-5">Services</h3>
              <div className="flex flex-col space-y-2 text-muted-foreground">
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
                <div className="flex flex-col space-y-4 text-muted-foreground">
                  <span className="flex flex-row justify-center md:justify-start hover:text-white">
                    <span className="text-red-600">
                      <MapPin />
                    </span>
                    &nbsp; 115, Senpara Parbata, Mirpur 10,
                    <br />
                    &nbsp; Dhaka-1216, Bangladesh
                  </span>
                  <span className="flex flex-row justify-center md:justify-start hover:text-white">
                    <span className="text-red-600">
                      <Phone />
                    </span>
                    &nbsp; +880 1970-831822
                  </span>
                  <span className="flex flex-row justify-center md:justify-start hover:text-white">
                    <span className="text-red-600">
                      <Phone />
                    </span>
                    &nbsp; +880 1742-321304
                  </span>
                  <span className="flex flex-row justify-center md:justify-start hover:text-white">
                    <span className="text-red-600">
                      <Mail />
                    </span>
                    &nbsp;&nbsp;&nbsp; info@aestheticeurasia.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:px-[160px] px-10">
            <div className="py-[32px] lg:flex text-center lg:justify-between border-t border-t-[#121212] text-sm">
              <div className="text-muted-foreground">
                &copy; {new Date().getFullYear()} Aesthetic Pixel Studio. All
                rights reserved by Aesthetic Eurasia Ltd.
              </div>
              <div className="font-bold text-muted-foreground">
                Aesthetic Eurasia
              </div>
            </div>
          </div>
        </footer>
      </div>
    </HideOnRoutes>
  );
}

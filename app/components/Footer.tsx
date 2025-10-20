"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import HideOnRoutes from "./HideOnRoutes";

export default function Footer() {
  return (
    <HideOnRoutes routes={["/book-a-slot", "/studio-rent"]}>
      <footer className="w-full height-[798px] bg-[#1e1e1e] text-white">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 px-6 py-10 items-center md:items-start justify-between">
          {/* Logo & Social */}
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
                professionals, PPD specializes in product
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
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-red-600 transition-colors duration-300"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Services */}
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

          {/* Contact Details */}
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

        {/* Bottom Footer */}
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
    </HideOnRoutes>
  );
}
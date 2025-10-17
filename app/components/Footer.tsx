"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import HideOnRoutes from "./HideOnRoutes";

export default function Footer() {
  return (
    <HideOnRoutes routes={["/book-a-slot", "/studio-rent"]}>
      <footer className="w-full bg-[#1e1e1e] text-white">
        {/* Map */}
        <div className="container mx-auto flex flex-col md:flex-row gap-8 px-6 py-10 items-center md:items-start justify-between">
          {/* Contact Info & Social Icons (Middle) */}
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-start">
            <h3 className="text-lg font-semibold text-white mb-5">
              Connect With Us
            </h3>
            <div className="flex flex-col items-center md:items-start text-sm text-gray-400 space-y-2">
              <span className="flex items-center space-x-2">
                <Phone /> <span>+880 1970-831822</span>
              </span>
              <span className="flex items-center space-x-2">
                <Phone /> <span>+880 1742-321304</span>
              </span>
              <span className="flex items-center space-x-2">
                <Mail /> <span>info@aestheticeurasia.com</span>
              </span>
              <span className="flex items-center space-x-2">
                <MapPin />
                <span>
                  115, Senpara Parbata, Mirpur 10, Dhaka-1216, Bangladesh
                </span>
              </span>
              {/* Social Icons */}
              <div className="flex space-x-6 mt-5 text-3xl text-white">
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

          {/* About Us */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <div className="rounded-2xl shadow-lg w-full max-w-[320px] px-4 flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold text-white mb-3">
                About Us
              </h3>
              <Image
                src="/logoDark.png"
                alt="Aesthetic Pixel Studio"
                width={100}
                height={80}
                className="mb-4"
              />
              <p className="text-sm text-gray-300 text-center md:text-justify">
                Aesthetic Pixel Studio – Bringing your products to life with
                professional photography. We capture every detail with
                creativity and precision, helping your brand stand out with
                stunning visuals and fast turnaround.
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <div className="overflow-hidden rounded-2xl shadow-lg w-full max-w-[320px] h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1878.6686024432474!2d90.36655142549787!3d23.805327058507654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1ae56136ed7%3A0x7e732822f8735331!2sAesthetic%20Eurasia%20Ltd!5e0!3m2!1sen!2sbd!4v1757136136842!5m2!1sen!2sbd"
                width="100%"
                height="200"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              />
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
                <span className="text-[#e81123]">Aesthetic</span> &nbsp;
                <span className="text-white">Eurasia</span>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </HideOnRoutes>
  );
}
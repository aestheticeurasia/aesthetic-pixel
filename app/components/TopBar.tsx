import { Mail } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import HideOnRoutes from "./HideOnRoutes";

export default function TopBar() {
  return (
    <HideOnRoutes routes={["/book-a-slot", "/studio-rent"]}>
      <div className="w-full bg-muted text-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          {/* Left side - Email */}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail size={16} />
            <a
              href="mailto:administration@aestheticeurasia.com"
              className="hover:underline"
            >
              administration@aestheticeurasia.com
            </a>
          </div>

          {/* Right side - Contact icons */}
          <div className="flex items-center space-x-4 text-muted-foreground">
            <Link href="https://wa.me/+8801970831822" target="_blank">
              <div className="flex items-center space-x-1 md:mr-5">
                <FaWhatsapp
                  size={25}
                  className="hover:text-primary transition"
                />
                <span className="hidden md:inline"> +880 1970-831822</span>
              </div>
            </Link>
            <Link href="tel:+8801970831822">
              <div className="flex items-center space-x-1">
                <FaPhoneAlt
                  size={20}
                  className="hover:text-primary transition"
                />
                <span className="hidden md:inline"> +880 1970-831822</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </HideOnRoutes>
  );
}

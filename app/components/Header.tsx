"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./dark-toggle";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => pathName === path;

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm bg-background">
      <div className="container mx-auto flex h-27 items-center justify-between px-4">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Aesthetic Pixel Logo"
              width={100}
              height={40}
            />
          </Link>
        </div>

        {/* Desktop Menu: centered */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-1 px-2 rounded-lg transition-all duration-300 ease-in-out ${
                isActive(link.href)
                  ? "bg-primary text-white dark:text-black font-bold"
                  : "text-primary hover:bg-gray-200 hover:text-xl dark:hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="hidden md:inline-flex">
          <ModeToggle />
        </span>
        {/* Mobile Menu Button: right aligned */}
        <div className="md:hidden gap-5 flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-muted"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Dropdown with smooth animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t bg-background ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-3 p-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`py-1 px-2 rounded-lg transition-all duration-300 ease-in-out ${
                isActive(link.href)
                  ? "bg-primary text-white font-bold"
                  : "text-primary hover:bg-gray-200 hover:text-xl"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

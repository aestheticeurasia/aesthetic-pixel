"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ModeToggle } from "./dark-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export default function MainNav() {
  const pathName = usePathname();
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const services = [
    { title: "Product Photography", href: "/services/product-photography" },
    { title: "Jewelry Photography", href: "/services/jewelry-photography" },
    { title: "Corporate Photography", href: "/services/corporate-photography" },
    {
      title: "E-commerce Photography",
      href: "/services/e-commerce-photography",
    },
    { title: "Fashion Photography", href: "/services/fashion-photography" },
  ];

  const isActive = (path: string) => pathName === path;

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm bg-background">
      <div className="container mx-auto flex h-25 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Aesthetic Pixel Logo"
            width={100}
            height={40}
            className="block dark:hidden"
          />
          <Image
            src="/logoDark.png"
            alt="Aesthetic Pixel Logo Dark"
            width={100}
            height={40}
            className="hidden dark:block"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-lg font-bold relative">
          {/* Home */}
          <Link
            href="/"
            className={`py-2 px-3 rounded-lg ${
              isActive("/")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black"
            }`}
          >
            Home
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`py-2 px-3 rounded-lg ${
              isActive("/about")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black"
            }`}
          >
            About
          </Link>

          {/* Services with dropdown */}
          <div className="relative group">
            <button className="py-2 px-3 rounded-lg text-primary hover:bg-gray-200 dark:hover:bg-gray-700">
              Services
            </button>
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-background shadow-lg rounded-lg p-3 w-64">
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Portfolio */}
          <Link
            href="/portfolio"
            className={`py-2 px-3 rounded-lg ${
              isActive("/portfolio")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black"
            }`}
          >
            Portfolio
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`py-2 px-3 rounded-lg ${
              isActive("/contact")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Theme Toggle */}
        <span className="hidden md:inline-flex">
          <ModeToggle />
        </span>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded hover:bg-muted">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <ModeToggle />
            <SheetContent side="left" className="bg-background">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2">
                {/* Home & About */}
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={`py-2 px-6 mx-4 font-bold rounded-lg block ${
                      isActive("/")
                        ? "bg-primary text-white dark:text-black px-5"
                        : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className={`py-2 px-6 mx-4 font-bold rounded-lg block ${
                      isActive("/about")
                        ? "bg-primary text-white dark:text-black"
                        : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    About
                  </Link>
                </SheetClose>

                {/* Services dropdown */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex justify-between items-center w-full py-2 px-6 mx-4 font-bold rounded-lg text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Services
                  </button>
                  {mobileServicesOpen &&
                    services.map((service) => (
                      <SheetClose asChild key={service.href}>
                        <Link
                          href={service.href}
                          className={`py-1 pl-9 mx-4 font-bold rounded block ${
                            isActive(service.href)
                              ? "bg-primary text-white dark:text-black"
                              : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {service.title}
                        </Link>
                      </SheetClose>
                    ))}
                </div>

                {/* Portfolio & Contact */}
                <SheetClose asChild>
                  <Link
                    href="/portfolio"
                    className={`py-2 px-6 mx-4 font-bold rounded-lg block ${
                      isActive("/portfolio")
                        ? "bg-primary text-white dark:text-black"
                        : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Portfolio
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className={`py-2 px-6 mx-4 font-bold rounded-lg block ${
                      isActive("/contact")
                        ? "bg-primary text-white dark:text-black"
                        : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Contact
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
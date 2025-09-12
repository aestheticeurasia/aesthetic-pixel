"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
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
        </div>

        {/* Desktop Menu */}
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

        {/* Desktop Theme Toggle */}
        <span className="hidden md:inline-flex">
          <ModeToggle />
        </span>

        {/* Mobile Menu (Sheet trigger) */}
        <div className="md:hidden gap-5 flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded hover:bg-muted">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <ModeToggle />

            <SheetContent side="left" className="bg-background">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-4 text-base font-medium">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={`py-1 px-2 mx-6 rounded-lg transition-all duration-300 ease-in-out ${
                        isActive(link.href)
                          ? "bg-primary text-white dark:text-black font-bold"
                          : "text-primary hover:bg-gray-200 hover:text-lg dark:hover:text-black"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

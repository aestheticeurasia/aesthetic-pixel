"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function MainNav() {
  const pathName = usePathname();
  const [mobileServicesOpen, setMobileServicesOpen] = useState(
    pathName?.startsWith("/services") || false
  );

  useEffect(() => {
    if (pathName?.startsWith("/services")) {
      setMobileServicesOpen(true);
    } else {
      setMobileServicesOpen(false);
    }
  }, [pathName]);

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
                : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
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
                : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            About
          </Link>

          {/* Services Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`py-2 px-3 rounded-lg font-bold text-xl ${
                    pathName?.startsWith("/services")
                      ? "bg-primary text-white dark:text-black"
                      : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
                    <ListItem
                      href="/services/product-photography"
                      title="Product Photography"
                    >
                      Showcase your products with professional, high-quality
                      images.
                    </ListItem>
                    <ListItem
                      href="/services/jewelry-photography"
                      title="Jewelry Photography"
                    >
                      Capture the sparkle and detail of your jewelry pieces.
                    </ListItem>
                    <ListItem
                      href="/services/corporate-photography"
                      title="Corporate Photography"
                    >
                      Build a professional brand image for your business.
                    </ListItem>
                    <ListItem
                      href="/services/e-commerce-photography"
                      title="E-commerce Photography"
                    >
                      Optimized photos designed to increase conversions.
                    </ListItem>
                    <ListItem
                      href="/services/fashion-photography"
                      title="Fashion Photography"
                    >
                      Stunning visuals for clothing lines, models, and
                      magazines.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Portfolio */}
          <Link
            href="/portfolio"
            className={`py-2 px-3 rounded-lg ${
              isActive("/portfolio")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Portfolio
          </Link>

          {/* Pricing */}
          <Link
            href="/pricing"
            className={`py-2 px-3 rounded-lg ${
              isActive("/pricing")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Pricing
          </Link>
          
          {/* Blog */}
          <Link
            href="/blog"
            className={`py-2 px-3 rounded-lg ${
              isActive("/blog")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Blogs
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`py-2 px-3 rounded-lg ${
              isActive("/contact")
                ? "bg-primary text-white dark:text-black"
                : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Theme Toggle */}
        <span className="hidden md:inline-flex text-foreground">
          <ModeToggle className="text-foreground" />
        </span>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded hover:bg-muted text-foreground">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2">
                {/* Home */}
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={`py-2 px-6 font-bold rounded-lg block ${
                      isActive("/")
                        ? "bg-primary mx-5 text-white dark:text-black"
                        : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Home
                  </Link>
                </SheetClose>

                {/* About */}
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className={`py-2 px-6 font-bold rounded-lg block ${
                      isActive("/about")
                        ? "bg-primary mx-5 text-white dark:text-black"
                        : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    About
                  </Link>
                </SheetClose>

                {/* Services Parent */}
                <div className="w-full overflow-hidden rounded-lg">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`w-full flex justify-between items-center py-2 px-6 mx-5 font-bold rounded-lg ${
                      pathName?.startsWith("/services")
                        ? "bg-primary text-white dark:text-black"
                        : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span>Services</span>
                    {/* Arrow */}
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-90" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Services Submenu */}
                {mobileServicesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {[
                      {
                        href: "/services/product-photography",
                        label: "Product Photography",
                      },
                      {
                        href: "/services/jewelry-photography",
                        label: "Jewelry Photography",
                      },
                      {
                        href: "/services/corporate-photography",
                        label: "Corporate Photography",
                      },
                      {
                        href: "/services/e-commerce-photography",
                        label: "E-commerce Photography",
                      },
                      {
                        href: "/services/fashion-photography",
                        label: "Fashion Photography",
                      },
                    ].map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={`block py-1 pl-4 rounded mx-7 ${
                            isActive(item.href)
                              ? "bg-primary text-white dark:text-black"
                              : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                )}

                {/* Portfolio */}
                <SheetClose asChild>
                  <Link
                    href="/portfolio"
                    className={`py-2 px-6 font-bold rounded-lg block ${
                      isActive("/portfolio")
                        ? "bg-primary mx-5 text-white dark:text-black"
                        : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Portfolio
                  </Link>
                </SheetClose>

                {/* Pricing */}
                <SheetClose asChild>
                  <Link
                    href="/pricing"
                    className={`py-2 px-6 font-bold rounded-lg block ${
                      isActive("/pricing")
                        ? "bg-primary mx-5 text-white dark:text-black"
                        : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Pricing
                  </Link>
                </SheetClose>

                {/* Blog */}
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className={`py-2 px-6 font-bold rounded-lg block ${
                      isActive("/blog")
                        ? "bg-primary mx-5 text-white dark:text-black"
                        : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Blogs
                  </Link>
                </SheetClose>

                {/* Contact */}
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className={`py-2 px-6 font-bold rounded-lg block ${
                      isActive("/contact")
                        ? "bg-primary mx-5 text-white dark:text-black"
                        : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Contact
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          {/* Dark Mode Toggle beside menu icon */}
          <ModeToggle className="text-foreground" />
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block p-2 rounded-lg hover:bg-muted">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

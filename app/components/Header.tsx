"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Armchair,
  User,
  Camera,
  Shirt,
  Sparkles,
  WandSparkles,
  Menu,
} from "lucide-react";
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
import HideOnRoutes from "./HideOnRoutes";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    href: "/services/product-photography",
    label: "Product Photography",
    icon: Camera,
    desc: "High conversion shorts",
  },
  {
    id: 2,
    href: "/services/apparel-and-garment-photography",
    label: "Apparel & Garment",
    icon: Shirt,
    desc: "Ghost mannequin styling",
  },
  {
    id: 3,
    href: "/services/corporate-head-shots",
    label: "Corporate Headshots",
    icon: User,
    desc: "Professional branding",
  },
  {
    id: 4,
    href: "/services/fashion-and-model-photography",
    label: "Fashion & Model",
    icon: Sparkles,
    desc: "Editorial campaigns",
  },
  {
    id: 5,
    href: "/services/furniture-photography",
    label: "Furniture Photography",
    icon: Armchair,
    desc: "Interior studio shots",
  },
  {
    id: 6,
    href: "/services/photo-retouching",
    label: "Photo Retouching",
    icon: WandSparkles,
    desc: "High-end editiong",
  },
];

export default function MainNav() {
  const pathName = usePathname();
  const [scrolled, setScrolled] = useState(false);
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

  const isActive = (path: string) => {
    if (path === "/") {
      return pathName === "/";
    }
    return pathName.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HideOnRoutes routes={["/book-a-slot", "/studio-rent"]}>
      <header
        className={`fixed top-0 left-0 md:px-10 w-full z-50 py-[14px] transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="px-10 flex h-15 items-center">
          <div className="flex justify-between items-center w-full py-4">
            {/* Logo */}
            <div>
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logoDark.png"
                  alt="Aesthetic Pixel Logo Dark"
                  width={70}
                  height={20}
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div>
              <nav className="hidden md:flex justify-start items-center space-x-1 text-md relative ms-4">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`rounded-lg bg-transparent text-lg ${
                          pathName?.startsWith("/services")
                            ? "bg-destructive text-white"
                            : "text-[#A1A1AA]"
                        }`}
                      >
                        Services
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-[#0c0c0d] text-[#A1A1AA] border-none">
                        <ul className="grid gap-5 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[606px]">
                          {services.map((service) => (
                            <ListItem
                              key={service.id}
                              title={service.label}
                              href={service.href}
                              icon={
                                <service.icon
                                  className="hover:text-white"
                                />
                              }
                            >
                              {service.desc}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Pricing */}
                <Link
                  href="/pricing"
                  className={`py-2 px-3 rounded-lg ${
                    isActive("/pricing")
                      ? "bg-destructive text-white dark:text-black"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  Pricing
                </Link>

                {/* Our Work */}
                <Link
                  href="/our-work"
                  className={`py-2 px-3 rounded-lg ${
                    isActive("/our-work")
                      ? "bg-destructive text-white dark:text-black"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  Our Work
                </Link>

                {/* About */}
                <Link
                  href="/about"
                  className={`py-2 px-3 rounded-lg ${
                    isActive("/about")
                      ? "bg-destructive text-white dark:text-black"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  About
                </Link>

                {/* Blog */}
                <Link
                  href="/blog"
                  className={`py-2 px-3 rounded-lg ${
                    isActive("/blog")
                      ? "bg-destructive text-white dark:text-black"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  Blogs
                </Link>
              </nav>
            </div>

            {/* Landing Page Button */}
            <div>
              <span className="hidden md:inline-flex text-foreground me-3">
                <Link
                  href="/studio-rent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="border-2 text-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 transition-colors rounded-md cursor-pointer text-sm md:text-l hover:text-white">
                    Studio Hire
                  </Button>
                </Link>
              </span>
              <span className="hidden md:inline-flex text-foreground me-3">
                <Link
                  href="/book-a-slot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="rounded-3xl bg-white text-black hover:text-white hover:bg-red-700 cursor-pointer py-2 px-4">
                    Book a Slot
                  </Button>
                </Link>
              </span>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="p-[9px] rounded-md bg-[#101010] border-white/10 hover:bg-gray-800">
                  <Menu size={50} strokeWidth={1.5} className="text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black/95 text-white border-none"
              >
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
                          ? "bg-destructive mx-5 text-white dark:text-black"
                          : "text- mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                          ? "bg-destructive mx-5 text-white dark:text-black"
                          : "mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      About
                    </Link>
                  </SheetClose>

                  {/* Services Parent */}
                  <div className="w-full overflow-hidden rounded-lg">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`w-full flex items-center py-2 px-6 mx-5 font-bold rounded-lg ${
                        pathName?.startsWith("/services")
                          ? "bg-destructive text-white dark:text-black"
                          : " hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span>Services</span>
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

                  {mobileServicesOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {services.map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={`block py-1 px-4 rounded mx-7 ${
                              isActive(item.href)
                                ? "bg-destructive text-white dark:text-black"
                                : " hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  )}

                  {/* Services */}
                  {/* <SheetClose asChild>
                    <Link
                      href="/services"
                      className={`py-2 px-6 font-bold rounded-lg block ${
                        isActive("/services")
                          ? "bg-destructive mx-5 text-white dark:text-black"
                          : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      Services
                    </Link>
                  </SheetClose> */}

                  {/* Portfolio */}
                  <SheetClose asChild>
                    <Link
                      href="/portfolio"
                      className={`py-2 px-6 font-bold rounded-lg block ${
                        isActive("/portfolio")
                          ? "bg-destructive mx-5 text-white dark:text-black"
                          : "mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      Portfolio
                    </Link>
                  </SheetClose>

                  {/* Contact */}
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className={`py-2 px-6 font-bold rounded-lg block ${
                        isActive("/contact")
                          ? "bg-destructive mx-5 text-white dark:text-black"
                          : "mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      Contact
                    </Link>
                  </SheetClose>

                  {/* Blog */}
                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className={`py-2 px-6 font-bold rounded-lg block ${
                        isActive("/blog")
                          ? "bg-destructive mx-5 text-white dark:text-black"
                          : "mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      Blogs
                    </Link>
                  </SheetClose>

                  {/* Quote */}
                  <SheetClose asChild>
                    <Link
                      href="/studio-rent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-5 px-8 block"
                    >
                      <button className="w-full border-2 text-red-500 bg-[#151515] border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-100 transition-colors rounded-md cursor-pointer text-sm md:text-lg">
                        Studio Hire
                      </button>
                    </Link>
                    {/* <Link
                  href="/studio-rent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="border-2 text-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-100 transition-colors rounded-md cursor-pointer text-sm md:text-lg">
                    Rent Studio
                  </button>
                </Link> */}
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/book-a-slot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-2 px-8 block"
                    >
                      <button className="w-full border-2 text-primary bg-white py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-700 transition-colors rounded-3xl cursor-pointer text-sm md:text-lg">
                        Book a Slot
                      </button>
                    </Link>
                    {/* <Link
                  href="/book-a-slot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="border-2 text-white bg-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-700 transition-colors rounded-md cursor-pointer text-sm md:text-lg">
                    Book a Slot
                  </button>
                </Link> */}
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </HideOnRoutes>
  );
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-[#161617]">
          <Link
          href={href}
          className="group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#18181b] border-[#242427] border-2 rounded-lg group-hover:bg-[#dc2626] group-hover:border-[#ef4444] group-hover:text-white">
              {icon}
            </div>
            <div>
              <div className="text-lg font-bold text-[#e4e4e7]">
                {title}
              </div>
              <p className="text-sm text-[#71717a]">{children}</p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

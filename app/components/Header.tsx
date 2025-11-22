"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeftRight, Clipboard, Menu } from "lucide-react";
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

const serviceSubMenu = [
  {
    href: "/services/product-photography",
    label: "Product Photography",
    desc: "Product Photography (Bags, Shoes, Jewelry, Watches, etc.)",
  },
  {
    href: "/services/apparel-and-garment-photography",
    label: "Apparel & Garment Photography",
    desc: "Optimized product photos sized and edited for online listings and ads.",
  },
  {
    href: "/services/corporate-head-shots",
    label: "Corporate Head Shots",
    desc: "Professional headshots for corporate branding and personal use.",
  },
  {
    href: "/services/fashion-and-model-photography",
    label: "Fashion & Model Photography",
    desc: "Headshots, facility photography and editorial assets for comms.",
  },
  {
    href: "/services/furniture-photography",
    label: "Furniture Photography",
    desc: "Controlled lighting and crisp detail for high-res deliverables.",
  },
  {
    href: "/services/photo-retouching",
    label: "Photo Retouching",
    desc: "Concept, styling and art direction to fit your brand voice.",
  },
  {
    href: "/services/product-photography",
    label: "Product Photography",
    desc: "Showcase your products with professional, high-quality images.",
  },
  {
    href: "/services/product-photography",
    label: "Product Photography",
    desc: "Showcase your products with professional, high-quality images.",
  },
];

export default function MainNav() {
  const pathName = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(
    pathName?.startsWith("/services") || false
  );
  const isHome = pathName === "/";

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
    if (!isHome) return;

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <HideOnRoutes routes={["/book-a-slot", "/studio-rent"]}>
      <header
        className={`fixed top-0 left-0 md:px-10 w-full z-50 transition-all duration-300 ${
          isHome
            ? scrolled
              ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm"
              : "bg-transparent"
            : "bg-white dark:bg-black shadow-sm"
        }`}
      >
        <div className="px-10 flex h-30 items-center">
          <div className="flex justify-between items-center w-full py-4">
            <div>
              <div className="flex">
                <div>
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
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex justify-start items-center space-x-1 text-lg font-bold relative ms-4">
                  {/* Home */}
                  <Link
                    href="/"
                    className={`py-2 px-3 rounded-lg ${
                      isActive("/")
                        ? "bg-destructive text-white dark:text-black"
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
                        ? "bg-destructive text-white dark:text-black"
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
                          className={`py-2 px-3 rounded-lg bg-transparent font-bold text-xl ${
                            pathName?.startsWith("/services")
                              ? "bg-destructive text-white dark:text-black"
                              : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                          }`}
                        >
                          Services
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-red-500">
                          <div className="flex flex-col md:flex-row gap-4  min-h-[300px]">
                            {/* Column 1: Studio (Items 0-3 from array) */}
                            <div className="flex-1 flex flex-col">
                              <h1 className="text-center text-white">Studio</h1>

                              <div className="bg-white rounded-lg flex-1 w-70">
                                <ul className="p-2 space-y-3">
                                  {serviceSubMenu
                                    .slice(0, 4)
                                    .map((item, index) => (
                                      <ListItem
                                        key={index}
                                        href={item.href}
                                        title={item.label}
                                      >
                                        {item.desc}
                                      </ListItem>
                                    ))}
                                </ul>
                              </div>
                            </div>

                            {/* Column 2: Platform (Items 4+ from array) */}
                            <div className="flex-1 flex flex-col">
                              <h1 className="text-center text-white">
                                Platform
                              </h1>

                              <div className="bg-white rounded-lg flex-1 w-70">
                                <ul className="p-2 space-y-3">
                                  {serviceSubMenu
                                    .slice(4)
                                    .map((item, index) => (
                                      <ListItem
                                        key={index}
                                        href={item.href}
                                        title={item.label}
                                      >
                                        {item.desc}
                                      </ListItem>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>

                  {/* Portfolio */}
                  <Link
                    href="/portfolio"
                    className={`py-2 px-3 rounded-lg ${
                      isActive("/portfolio")
                        ? "bg-destructive text-white dark:text-black"
                        : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    Portfolio
                  </Link>

                  {/* Contact */}
                  <Link
                    href="/contact"
                    className={`py-2 px-3 rounded-lg ${
                      isActive("/contact")
                        ? "bg-destructive text-white dark:text-black"
                        : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    Contact
                  </Link>

                  {/* Blog */}
                  <Link
                    href="/blog"
                    className={`py-2 px-3 rounded-lg ${
                      isActive("/blog")
                        ? "bg-destructive text-white dark:text-black"
                        : "text-primary hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    Blogs
                  </Link>
                </nav>
              </div>
            </div>
            <div>
              <span className="hidden md:inline-flex text-foreground me-3">
                <Link
                  href="/studio-rent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="border-2 text-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-100 transition-colors rounded-md cursor-pointer text-sm md:text-lg">
                    Rent Studio
                  </button>
                </Link>
              </span>
              <span className="hidden md:inline-flex text-foreground me-3">
                <Link
                  href="/book-a-slot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="border-2 text-white bg-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-700 transition-colors rounded-md cursor-pointer text-sm md:text-lg">
                    Book a Slot
                  </button>
                </Link>
              </span>
            </div>
          </div>

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
                          ? "bg-destructive mx-5 text-white dark:text-black"
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
                          ? "bg-destructive mx-5 text-white dark:text-black"
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
                          ? "bg-destructive text-white dark:text-black"
                          : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
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
                      {serviceSubMenu.map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={`block py-1 px-4 rounded mx-7 ${
                              isActive(item.href)
                                ? "bg-destructive text-white dark:text-black"
                                : "text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
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
                          : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                          : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                          : "text-primary mx-5 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                     <button className="w-full border-2 text-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-100 transition-colors rounded-md cursor-pointer text-sm md:text-lg">
                    Rent Studio
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
                      <button className="w-full border-2 text-white bg-red-500 border-red-500 py-3 px-5 md:py-2 md:px-6 font-bold hover:bg-red-700 transition-colors rounded-md cursor-pointer text-sm md:text-lg">
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
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="group block py-3 rounded-lg hover:bg-red-600"
        >
          <div className="text-lg leading-none group-hover:text-white">{title}</div>
          <p className="line-clamp-2 text-sm group-hover:text-gray-200">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
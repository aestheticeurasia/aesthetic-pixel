"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
           <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Aesthetic Pixel Logo"
              width={50}
              height={20}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 text-xl font-medium">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/services" className="hover:text-primary">Services</Link>
          <Link href="/portfolio" className="hover:text-primary">Showcase</Link>
          <Link href="/contact" className="hover:text-primary">Pricing</Link>
          <Link href="/blogs" className="hover:text-primary">Blogs</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-muted"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-3 p-4 text-sm font-medium">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/portfolio" onClick={() => setIsOpen(false)}>Showcase</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Blogs</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

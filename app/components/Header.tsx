"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src="/logo.png" alt="Aesthetic Pixel Logo" width={50} height={20} />
          </Link>
        </div>

        {/* Desktop Menu: centered */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 text-lg font-medium">
          <Link href="/" className="text-primary py-1 px-2 rounded-lg hover:bg-gray-200 hover:text-xl transition-all duration-300 ease-in-out">Home</Link>
          <Link href="/about" className="text-primary py-1 px-2 rounded-lg hover:bg-gray-200 hover:text-xl transition-all duration-300 ease-in-out">About</Link>
          <Link href="/services" className="text-primary py-1 px-2 rounded-lg hover:bg-gray-200 hover:text-xl transition-all duration-300 ease-in-out">Services</Link>
          <Link href="/portfolio" className="text-primary py-1 px-2 rounded-lg hover:bg-gray-200 hover:text-xl transition-all duration-300 ease-in-out">Portfolio</Link>
          <Link href="/contact" className="text-primary py-1 px-2 rounded-lg hover:bg-gray-200 hover:text-xl transition-all duration-300 ease-in-out">Contact</Link>
        </nav>

        {/* Mobile Menu Button: right aligned */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-muted" >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown with smooth animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t bg-background ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-3 p-4 text-sm font-medium">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  )
}

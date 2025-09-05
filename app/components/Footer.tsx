import { FaFacebookSquare, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto flex flex-col md:flex-row h-16 items-center justify-between px-4 my-3">
              <span className="text-center md:text-left mb-5 md:mb-0">  
                <p className="text-lg font-medium">© 2025 Aesthetic Pixel Studio. 
                    All rights reserved by 
                    <a className="font-bold" href="https://www.aestheticeurasia.com" target="_blank" rel="noopener noreferrer">
                 <span className="text-red-700">   Aesthetic</span> Eurasia
                    </a>
                    </p></span>
          <span className="text-center md:text-right pb-5 md:pb-0">
                  <nav className="flex space-x-6 text-2xl font-medium">
                    <a href="/privacy" className="hover:text-primary">
                    <FaFacebookSquare />
                    </a>
                    <a href="/terms" className="hover:text-primary">
                    <FaYoutube />
                    </a>
                </nav>
          </span>
            </div>
        </footer>
    );
}
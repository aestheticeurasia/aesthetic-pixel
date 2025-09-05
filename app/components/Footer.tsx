import { FaFacebookSquare, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-5">
              <span className="text-center md:text-left md:mb-0">  
                <p className="text-md font-medium text-gray-500">© 2025 Aesthetic Pixel Studio. 
                         All rights reserved by 
                    <a className="font-bold" href="https://www.aestheticeurasia.com" target="_blank" rel="noopener noreferrer">
                     <span className="text-black"><span className="text-red-700">   Aesthetic</span> Eurasia</span>  
                    </a>
                    </p>
              </span>
              <span className="text-center md:text-right pt-3 md:pt-0">
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
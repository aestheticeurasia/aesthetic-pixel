
import { Mail} from "lucide-react"
import { FaWhatsapp,FaPhoneAlt  } from "react-icons/fa"
import Link from "next/link"

export default function TopBar() {
  return (
    <div className="w-full bg-muted text-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Left side - Email */}
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Mail size={16} />
          <a href="mailto:hello@example.com" className="hover:underline">
            administration@aestheticeurasia.com
          </a>
        </div>

        {/* Right side - Contact icons */}
        <div className="flex items-center space-x-4 text-muted-foreground">
          <Link href="https://wa.me/+8801970831822" target="_blank">
            <FaWhatsapp size={25} className="hover:text-primary transition"/>
          </Link>
          <Link href="tel:+8801970831822">
            <FaPhoneAlt size={18} className="hover:text-primary transition" />
          </Link>
        </div>
      </div>
    </div>
  )
}
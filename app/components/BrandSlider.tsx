import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
  "/aestheticIT.jpg",
  "/aestheticFashion.jpg",
];

export default function BrandSlider() {
    return (
              <div>
                <Marquee pauseOnHover={true} speed={90} direction="left">
                  {brands.map((brand, index) => (
                    <Image
                      src={brand}
                      alt={`Brand ${index + 1}`}
                      key={index}
                      width={199}
                      height={133}
                      className="w-[199px] h-[133px] object-contain hover:scale-150 transition-transform duration-900"
                    />
                  ))}
                </Marquee>
              </div>
    )
}
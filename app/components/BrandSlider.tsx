import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  "/aestheticIT.png",
  "/aestheticFashion.png",
  "/aestheticIT.png",
  "/aestheticFashion.png",
  "/aestheticIT.png",
  "/aestheticFashion.png",
  "/aestheticIT.png",
  "/aestheticFashion.png",
  "/aestheticIT.png",
  "/aestheticFashion.png",
  "/aestheticIT.png",
  "/aestheticFashion.png",
  "/aestheticIT.png",
  "/aestheticFashion.png",
];

export default function BrandSlider() {
  return (
    <div>
      <Marquee pauseOnHover speed={90} direction="left">
        {brands.map((brand, index) => (
          <div key={index} className="mx-8 flex items-center">
            <Image
              src={brand}
              alt={`Brand ${index + 1}`}
              width={90}
              height={90}
              className="aspect-square object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

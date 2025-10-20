"use client";
import Image from "next/image";

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

const gridItemsData = [
  {
    id: 1,
    type: "image",
    src: "/stack1.jpg",
    alt: "Cosmetic oil bottle on rocks",
    className: "bg-amber-100/50", // Default size (1x1)
  },
  {
    id: 2,
    type: "content",
    title: "HomeMade App And Web Development",
    text: "HomeMade is website for culinary in Jakarta City. We use web for founding foodplace nearly. Made easy for immigrant Hawaiia...",
    link: "#",
    className: "bg-red-500 text-white md:row-span-2", // Spans 2 rows on medium screens and up
  },
  {
    id: 3,
    type: "image",
    src: "/stack2.jpg",
    alt: "Minimalist room with chair and monstera plant",
    className: "bg-gray-100 row-span-2 hidden md:block", // Spans 2 rows, hidden on mobile
  },
  {
    id: 4,
    type: "image",
    src: "/stack3.jpg",
    alt: "Green cosmetic tube on a wooden swing with leaves",
    className: "bg-green-700 row-span-2 hidden sm:block", // Spans 2 rows, hidden on small screens
  },
  {
    id: 5,
    type: "image",
    src: "/images/earrings.jpg",
    alt: "Silver earrings on a large green leaf",
    className: "bg-amber-800/50", // Default size (1x1)
  },
  {
    id: 6,
    type: "image",
    src: "/images/portrait.jpg",
    alt: "Split portrait of a woman",
    className: "bg-purple-200", // Default size (1x1)
  },
];

export default function Banner() {
  return (
    <div>
      <section className="lg:py-[80px] lg:px-[140px] py-10 px-6 bg-[#f8f7fa] dark:bg-black">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 justify-items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-transform duration-300 flex justify-center items-center bg-white px-[38px] py-[4.5px]"
            >
              <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                width={199}
                height={133}
                className="w-[199px] h-[133px] object-cover"
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-5xl font-bold text-center my-15">
          Our Comprehensive Services
        </h1>
      </section>
    </div>
  );
}

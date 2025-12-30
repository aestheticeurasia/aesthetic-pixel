"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ArrowRight, Clock, Search, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the Blog type
interface Author {
  id: string;
  name: string;
  profileUrl: string;
}

interface Blog {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  tags: string[];
  category: string;
  author: Author;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchBlog, setSearchBlog] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const getAllBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/blogs.json");
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //search blogs
  const query = searchBlog.toLowerCase();
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(query) ||
      blog.author?.name?.toLowerCase().includes(query)
  );

  //filter categories
  const categories = [
    "All",
    ...Array.from(new Set(filteredBlogs.map((blog) => blog.category))),
  ];

  //render blogs
  const visibleBlogs =
    activeCategory === "All"
      ? filteredBlogs
      : filteredBlogs.filter((blog) => blog.category === activeCategory);

  //initialize
  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div>
      {/* Blogs */}
      <section className=" px-6 md:px-12 lg:px-[320px]">
        <div className="py-12 bg-[url('/layoutComponents/blogBlur.svg')] bg-no-repeat bg-center">
          <h1 className="text-3xl font-bold text-center text-white">Blogs</h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search Blogs..."
            className="bg-[#121212] border-[#2d2d2d] border-2 text-white h-12 pl-11"
            value={searchBlog}
            onChange={(e) => setSearchBlog(e.target.value)}
          />
        </div>

        {/* Filtered Buttons */}
        <div className="flex flex-wrap gap-3 my-10 justify-center ">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
        px-5 py-2 rounded-full text-sm font-semibold
        transition-all duration-300
        ${
          activeCategory === category
            ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
            : "bg-[#1a1a1a] text-gray-300 hover:bg-[#262626] hover:text-white"
        }
      `}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <Spinner className="size-8 m-auto" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {visibleBlogs.length === 0 ? (
              <p className="text-center text-white col-span-3 font-bold text-2xl my-10">
                No blogs found.
              </p>
            ) : (
              visibleBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="cursor-pointer"
                >
                  <div className="mx-5 md:mx-0 bg-[#0a0a0a] border-[#222222] border-1 rounded-lg overflow-hidden flex flex-col h-full">
                    <div className="relative">
                      <a href={`/blog/${blog.slug}`} className="block">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          width={400}
                          height={250}
                          className="h-70 object-cover"
                          loading="lazy"
                        />
                      </a>
                      {blog.category && (
                        <span className="absolute top-4 left-4 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm capitalize">
                          {blog.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between space-x-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>By {blog.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>
                            {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <a
                          href={`/blog/${blog.slug}`}
                          className="text-white hover:text-red-600 transition-colors"
                        >
                          {blog.title}
                        </a>
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                        {blog.description}
                      </p>
                      <a
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center text-red-600 font-semibold mt-6 hover:text-red-700 transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </section>

      {/* Quote */}
      <section className="border-t border-b border-[#481414]/50 py-5 mt-10 lg:mt-20">
        <div className="px-6 md:px-12 lg:px-[320px]">
          <div className="relative lg:px-[279px] lg:py-[80px] px-10 py-15 border-2 border-[#221919] hover:border-red-900 rounded-3xl bg-[#0a0a0b] text-center overflow-hidden">
            <div
              className="
      absolute top-0 right-0
      w-[300px] h-[300px]
      bg-[url('/layoutComponents/qouteBlur-top.svg')]
      bg-no-repeat bg-contain
      pointer-events-none
      opacity-70
    "
            />

            <div
              className="
      absolute bottom-0 left-0
      w-[300px] h-[300px]
      bg-[url('/layoutComponents/qouteBlur.svg')]
      bg-no-repeat bg-contain
      pointer-events-none
      opacity-70
    "
            />
            <h1 className="lg:text-5xl text-3xl font-bold text-white">
              Get One Stop Digital <br className="lg:hidden" />
              Solutions <br className="lg:hidden" /> Under One Roof
            </h1>

            <h4 className="text-muted-foreground my-10 text-lg">
              Ready to Transform your brand image? Call us Directly:{" "}
              <br className="lg:hidden" />
              <span className="font-bold text-red-800">+880 1711-205200</span>
            </h4>

            <div className="flex justify-center">
              <a href="#quote">
                <Button className="bg-white font-bold text-black text-xl rounded-4xl px-12 py-7 hover:bg-red-700 hover:text-white cursor-pointer">
                  Get Free Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

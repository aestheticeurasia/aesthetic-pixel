"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ArrowRight, Clock, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

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
  author: Author;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-12">Blogs</h1>
      {loading ? (
        <Spinner className="size-8 m-auto" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6 cursor-pointer">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="cursor-pointer"
            >
              <div className="mx-5 md:mx-0 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg h-full">
                <div className="relative">
                  <a href={`/blog/${blog.slug}`} className="block">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      width={400}
                      height={208}
                      className="w-full h-52 object-cover"
                      loading="lazy"
                    />
                  </a>
                  {blog.tags && blog.tags.length > 0 && (
                    <span className="absolute top-4 left-4 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm capitalize">
                      {blog.tags[0]}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>By {blog.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{dayjs(blog.publishedAt).format("MMM D, YYYY")}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    <a
                      href={`/blog/${blog.slug}`}
                      className="hover:text-red-600 transition-colors"
                    >
                      {blog.title}
                    </a>
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow">
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
          ))}
        </div>
      )}
    </div>
  );
}

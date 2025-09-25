"use client";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

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

  const getAllBlog = async () => {
    try {
      const { data } = await axios.get("/blogs.json");
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mt-3">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6 cursor-pointer">
        {blogs.map((b) => (
          <Link
            key={b.slug}
            href={`/blog/${b.slug}`}
            className="cursor-pointer"
          >
            <Card className="flex flex-col h-full overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 p-0">
              {/* Cover Image */}
              <div className="w-full h-48 relative">
                <Image
                  src={b.coverImage}
                  alt={b.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 min-h-[56px]">
                  {b.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 min-h-[60px]">
                  {b.description}
                </p>

                <div className="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>By {b.author.name}</span>
                  <span>{dayjs().format('DD MMM YYYY')}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";
import GoBackButton from "@/app/components/GoBackButton";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";

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

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogDetail({ params }: Props) {
  // unwrap params
  const { slug } = use(params);

  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get<Blog[]>("/blogs.json");
        const found = data.find((b) => b.slug === slug) || null;
        setBlog(found);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="container mx-auto p-10">
      <div className="lg:relative mt-3 mb-10">
  <div className="absolute left-4 sm:left-5 md:left-0 lg:left-0">
          <GoBackButton />
        </div>
        <h1 className="text-3xl font-bold text-center">{blog?.title}</h1>
      </div>
      <Image
        src={blog?.coverImage}
        alt={blog?.title}
        className="w-full h-64 object-cover mb-6 rounded-lg"
        width={800}
        height={400}
      />

      <p className="text-gray-500 dark:text-gray-300 md:my-4 text-between flex flex-row justify-between  md:px-10">
        <span>{blog?.author?.name}</span>{" "}
        <span>{new Date(blog?.publishedAt).toLocaleDateString()}</span>
      </p>
      <div
        className="prose dark:prose-invert md:mx-10 mt-8 text-xl text-justify text-space-y-4"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      />
    </div>
  );
}
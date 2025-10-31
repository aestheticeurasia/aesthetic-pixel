"use client";
import GoBackButton from "@/app/components/GoBackButton";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

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
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Blog[]>("/blogs.json");
        const found = data.find((b) => b.slug === slug) || null;
        setBlog(found);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto">
        <div className="mt-10">
          <GoBackButton />
        </div>
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-semibold mt-6 text-gray-700 dark:text-gray-200">
            Blog Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 px-3">
            The blog you’re looking for doesn’t exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-10">
      <div className="lg:relative mt-3 mb-10">
        <div className="absolute left-4 sm:left-5 md:left-0 lg:left-0">
          <GoBackButton />
        </div>
        <h1 className="text-3xl font-bold text-center">{blog?.title}</h1>
      </div>
      <div>
        <Image
          src={blog?.coverImage}
          alt={blog?.title}
          className="w-full h-64 object-cover mb-6 rounded-lg"
          width={800}
          height={400}
        />

        <p className="text-gray-500 dark:text-gray-300 md:my-4 text-between flex flex-row justify-between  md:px-10">
          <span>Written by: {blog?.author?.name}</span>{" "}
          <span>Published on: {dayjs().format("DD MMM YYYY")}</span>
        </p>
        <div
          className="prose dark:prose-invert md:mx-10 mt-8 text-xl text-justify text-space-y-4"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>
    </div>
  );
}

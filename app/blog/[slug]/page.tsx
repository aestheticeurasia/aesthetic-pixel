import type { Metadata } from "next";
import BlogDetail from "./BlogDetails";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return { title: "Blog" };

  const title = slug
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return {
    title,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  
  return <BlogDetail slug={slug} />;
}
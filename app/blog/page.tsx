import type { Metadata } from "next";
import Blog from "./Blog";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function BlogPage() {
  return <Blog />;
}

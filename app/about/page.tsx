import type { Metadata } from "next";
import AboutPage from "./About";

export const metadata: Metadata = {
  title: "About Us",
};

export default function About() {
  return <AboutPage/>;
}
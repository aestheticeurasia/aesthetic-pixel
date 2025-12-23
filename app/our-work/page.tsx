import type { Metadata } from "next";
import Portfolio from "./OurWork";

export const metadata: Metadata = {
  title: "Our Work",
};

export default function OurWork() {
  return <Portfolio />;
}

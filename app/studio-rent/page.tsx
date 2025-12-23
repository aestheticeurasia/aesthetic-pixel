import type { Metadata } from "next";
import StudioRent from "./StudioRent";

export const metadata: Metadata = {
  title: "Studio Hire",
};

export default function StudioRentPage() {
  return <StudioRent/>;
}
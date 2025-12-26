import type { Metadata } from "next";
import StudioHire from "./StudioHire";

export const metadata: Metadata = {
  title: "Studio Hire",
};

export default function StudioHirePage() {
  return <StudioHire/>;
}
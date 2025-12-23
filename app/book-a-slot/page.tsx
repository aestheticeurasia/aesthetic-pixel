import type { Metadata } from "next";
import BookASlot from "./BookASlot";

export const metadata: Metadata = {
  title: "Book a Slot",
};

export default function BookASlotPage() {
  return <BookASlot />;
}

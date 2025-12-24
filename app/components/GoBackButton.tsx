"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="bg-black text-white hover:bg-zinc-800 cursor-pointer"
    >
      <ArrowLeft size={16} className="text-white" />
    </Button>
  );
}

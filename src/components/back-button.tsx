"use client";

import { Button } from "@/elements/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="icon"
      onClick={() => router.back()}
      variant="ghost"
      className="h-14 w-14 [&_svg:not([class*='size-'])]:size-6"
    >
      <ChevronLeft />
    </Button>
  );
}

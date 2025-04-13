"use client";

import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="size-full flex items-center justify-center">
      <Loader2
        className="animate-spin text-primary"
        size={56}
        strokeWidth={3}
      />
    </div>
  );
}

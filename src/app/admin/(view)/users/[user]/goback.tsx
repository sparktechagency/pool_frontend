"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Goback() {
  const navig = useRouter();
  return (
    <button
      className="text-xl font-bold flex gap-2 items-center cursor-pointer py-2 hover:scale-105 transition-transform"
      onClick={() => {
        navig.back();
      }}
    >
      <ChevronLeftIcon /> Service Provider profile
    </button>
  );
}

"use client";
import { Loader2Icon } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import Chat from "./chat";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-24 mx-auto">
          <Loader2Icon className="animate-spin" />
        </div>
      }
    >
      <Chat />
    </Suspense>
  );
}

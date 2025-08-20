"use client";
import React, { useState, useEffect } from "react";
import Subsc from "./subsc";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    ); // or a loading spinner

  return <Subsc />;
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackToBidPage() {
  const router = useRouter();
  const [bidPage, setBidPage] = useState<string | null>(null);

  useEffect(() => {
    const page = localStorage.getItem("bid_page");
    if (page) {
      setBidPage(page);
    }
  }, []);

  if (!bidPage) return null;

  const handleClick = () => {
    router.push(bidPage);
    localStorage.removeItem("bid_page");
  };

  return (
    <Button className="w-full" onClick={handleClick}>
      Go back to bid page
    </Button>
  );
}

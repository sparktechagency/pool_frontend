"use server";
import { Button } from "@/components/ui/button";
import { getProfileApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function ButtonCheck() {
  const token = (await cookies()).get("ghost")?.value;
  if (!token) {
    return (
      <Button
        className="w-full sm:w-auto lg:text-xl py-6! px-8! bg-[#003B73] hover:bg-[#002873e5]"
        asChild
      >
        <Link href="/browse">Browse Quotes</Link>
      </Button>
    );
  }
  const call: AnyType = await getProfileApi(token ?? "");
  if (call.data.role === "USER") {
    return (
      <Button
        className="w-full sm:w-auto lg:text-xl py-6! px-8! bg-[#003B73] hover:bg-[#002873e5]"
        asChild
      >
        <Link href="/get-service">Get Quotes</Link>
      </Button>
    );
  } else {
    return (
      <Button
        className="w-full sm:w-auto lg:text-xl py-6! px-8! bg-[#003B73] hover:bg-[#002873e5]"
        asChild
      >
        <Link href="/browse">Browse Quotes</Link>
      </Button>
    );
  }
}

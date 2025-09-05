"use server";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProfileApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function ButtonCheck() {
  const token = (await cookies()).get("ghost")?.value;

  let href = "/browse";
  if (token) {
    try {
      const { data }: AnyType = await getProfileApi(token);
      // console.log(data);
      if (data?.role === "USER") href = "/get-service";
    } catch {}
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto lg:text-xl py-6! px-8! bg-[#003B73] hover:bg-[#002873e5]">
            Get Quotes
          </Button>
        </DialogTrigger>
        <DialogContent className="md:w-[500px] bg-primary/50 backdrop-blur-[2px] border-0 shadow-lg shadow-black/50 text-background">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="px-4! md:px-6! space-y-4!">
            <h1 className="text-center text-xl md:text-2xl">
              Welcome to Pool Valet
            </h1>
            <p className="text-sm text-center text-background/60">
              Whether you&apos;re a pool professional offering expert service or
              a homeowner seeking trusted care, Pool Valet connects you with
              what matters quality, convenience, and peace of mind.
            </p>
            <Button
              size="lg"
              className="bg-accent-foreground hover:bg-accent-foreground/80 rounded-full w-full"
              asChild
            >
              <Link href={`/auth?as=user`}>Continue as Home Owner</Link>
            </Button>
            <Button
              size="lg"
              className="bg-background hover:bg-slate-200 text-foreground rounded-full w-full"
              asChild
            >
              <Link href="/auth?as=provider">Continue as Service Provider</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      className="w-full sm:w-auto lg:text-xl py-6! px-8! bg-[#003B73] hover:bg-[#002873e5]"
      asChild
    >
      <Link href={href}>Get Quotes</Link>
    </Button>
  );
}

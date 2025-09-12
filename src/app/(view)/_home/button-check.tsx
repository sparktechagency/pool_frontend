"use client";

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
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useMemo } from "react";
import { useCookies } from "react-cookie";

export default function ButtonCheck() {
  const [{ ghost }] = useCookies(["ghost"]);

  const { data, isPending } = useQuery({
    queryKey: ["profile", ghost],
    queryFn: (): AnyType => getProfileApi(ghost),
    enabled: !!ghost, // don’t run if no cookie
  });

  // decide target link based on profile
  const href = useMemo(() => {
    if (isPending) return "/browse"; // fallback while loading
    if (data?.role === "USER") return "/get-service";
    return "/browse";
  }, [data, isPending]);

  if (!ghost) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto lg:text-xl py-6 px-8 bg-[#003B73] hover:bg-[#002873e5]">
            Get Quotes
          </Button>
        </DialogTrigger>
        <DialogContent className="md:w-[500px] bg-primary/50 backdrop-blur-[2px] border-0 shadow-lg shadow-black/50 text-background">
          <DialogHeader>
            <DialogTitle className="text-center text-xl md:text-2xl">
              Welcome to Pool Valet
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 md:px-6 space-y-4">
            <p className="text-sm text-center text-background/60">
              Whether you&apos;re a pool professional offering expert service or
              a homeowner seeking trusted care, Pool Valet connects you with
              what matters: quality, convenience, and peace of mind.
            </p>
            <Button
              size="lg"
              className="bg-accent-foreground hover:bg-accent-foreground/80 rounded-full w-full"
              asChild
            >
              <Link href="/auth?as=user">Continue as Home Owner</Link>
            </Button>
            <Button
              size="lg"
              className="bg-background hover:bg-slate-200 text-foreground rounded-full w-full"
              asChild
            >
              <Link suppressHydrationWarning href="/auth?as=provider">
                Continue as Service Provider
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      className="w-full sm:w-auto lg:text-xl py-6 px-8 bg-[#003B73] hover:bg-[#002873e5]"
      size={"lg"}
      asChild
    >
      <Link href={href}>Get Quotes</Link>
    </Button>
  );
}

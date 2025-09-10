"use client";
import React, { useEffect, useState } from "react";
import { getProfileApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCookies } from "react-cookie";
import dynamic from "next/dynamic";

const QuoteForm = dynamic(() => import("./quote-form"), { ssr: false });

export default function QuotePage() {
  const [{ ghost: token }] = useCookies(["ghost"]);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // <-- key

  useEffect(() => {
    setMounted(true); // only mark mounted after first render

    if (!token) return;

    const fetchProfile = async () => {
      try {
        const call: AnyType = await getProfileApi(token);
        setRole(call?.data?.role || null);
      } catch {
        setError("Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [token]);

  if (!mounted) return null; // <-- prevents SSR mismatch

  if (!token) {
    return (
      <div className="px-4 md:px-6 space-y-4">
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
    );
  }

  if (!role && !error) {
    return (
      <div className="flex justify-center items-center h-24">Loading...</div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-24">{error}</div>;
  }

  if (role !== "USER") {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        You must be logged in as a Home owner
      </div>
    );
  }

  return <QuoteForm />;
}

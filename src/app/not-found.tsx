import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="h-dvh w-dvw flex flex-col justify-center items-center bg-slate-300">
      <h1 className="text-8xl font-semibold text-center">404</h1>
      <p>Page not found</p>
      <div className="mt-6">
        <Button variant={"secondary"} asChild>
          <Link href={"/"}>Go Back Home</Link>
        </Button>
      </div>
    </main>
  );
}

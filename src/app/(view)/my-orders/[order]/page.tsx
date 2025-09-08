import React, { Suspense } from "react";
import Order from "./order";
import { Loader2Icon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const id = (await params).order;
  return (
    <main className="my-12! px-8!">
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Order id={id} />
      </Suspense>
    </main>
  );
}

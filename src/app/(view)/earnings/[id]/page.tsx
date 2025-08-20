import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import Details from "./details";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <main>
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Details id={id} />
      </Suspense>
    </main>
  );
}

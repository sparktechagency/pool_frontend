import React, { Suspense } from "react";
import Details from "./details";
import { Loader2Icon } from "lucide-react";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ id?: string; quote?: string; xxx?: string }>;
  params: Promise<{ order: string }>;
}) {
  const { id, quote, xxx } = await searchParams;
  const { order } = await params;

  if (!id) {
    return <div>No provider ID found in search params</div>;
  }
  if (!quote) {
    return <div>No Quote found in search params</div>;
  }
  if (!xxx) {
    return <div>No Security Code found in search params</div>;
  }

  return (
    <main>
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Details
          id={id as string}
          quoteId={order as string}
          xxx={xxx as string}
        />
      </Suspense>
    </main>
  );
}

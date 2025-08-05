import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import Details from "./detail";
import { ViewBrowsedQuoteApi } from "@/lib/api/core/core";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = (await cookies()).get("ghost")?.value;
  const id = (await params).id;
  const call: AnyType = await ViewBrowsedQuoteApi(id, token ?? "");

  return (
    <main>
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Details data={call.data} />
      </Suspense>
    </main>
  );
}

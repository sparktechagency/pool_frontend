import Bread from "@/components/core/bread";
import BidList from "./bid-list";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const order = (await params).order;
  console.log(order);

  return (
    <>
      <Bread />
      <main className="px-8! py-12!">
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <BidList id={order} />
        </Suspense>
      </main>
    </>
  );
}

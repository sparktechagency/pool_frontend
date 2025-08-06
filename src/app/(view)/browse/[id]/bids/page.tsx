import Bread from "@/components/core/bread";

// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { Suspense } from "react";

import { Loader2Icon } from "lucide-react";
import OrderPage from "./order-page";

export default function Page() {
  return (
    <>
      <Bread />
      <main className="px-2! lg:px-8! py-12!">
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <OrderPage />
        </Suspense>
      </main>
    </>
  );
}

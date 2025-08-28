import Bread from "@/components/core/bread";

import React, { Suspense } from "react";
import QuoteList from "./quote-list";
import { Loader2Icon } from "lucide-react";
//
export default function Page() {
  return (
    <>
      <Bread />
      <main className="px-8! py-12!">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          }
        >
          <QuoteList />
        </Suspense>
      </main>
    </>
  );
}

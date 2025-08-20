import React, { Suspense } from "react";
import BrandTable from "./brand-table";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6">
      <div className="space-y-4! mb-4!">
        <h1 className="text-4xl font-semibold">Quote listing</h1>
      </div>
      <div className="w-full flex flex-row justify-between items-center"></div>
      <div className="!mt-0">
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <BrandTable />
        </Suspense>
      </div>
    </div>
  );
}

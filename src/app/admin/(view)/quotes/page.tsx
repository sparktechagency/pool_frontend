import React from "react";
import BrandTable from "./brand-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6">
      <div className="space-y-4! mb-4!">
        <h1 className="text-4xl font-semibold">Quote listing</h1>
      </div>
      <div className="w-full flex flex-row justify-between items-center"></div>
      <div className="!mt-0">
        <BrandTable />
      </div>
      <div className="border-t mt-12! flex flex-row justify-between items-center pt-6! text-sm font-semibold">
        <p>Page 1 of 10</p>
        <div className="flex items-center gap-4">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}

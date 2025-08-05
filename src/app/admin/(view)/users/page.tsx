import { Input } from "@/components/ui/input";
import React from "react";
import BrandTable from "./brand-table";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6">
      <div className="space-y-4! mb-4!">
        <h1 className="text-4xl font-semibold">Manage Users</h1>
        <p className="text-muted-foreground text-sm">
          Admin with access to this workspace can promote or demote user
          maintain business insights
        </p>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="w-full border rounded-lg flex items-center px-4!">
          <SearchIcon className="text-muted-foreground size-4" />
          <Input
            placeholder="Search by name or email"
            className="border-0 shadow-none outline-0! ring-0!"
            inputMode="search"
          />
        </div>
      </div>
      <div className="!mt-12">
        <BrandTable />
      </div>
      <div className="border-t mt-12! flex flex-row justify-between items-center pt-6! text-sm">
        <p>Page 1 of 10</p>
        <div className="flex items-center gap-4">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}

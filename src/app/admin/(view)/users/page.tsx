import React from "react";
import BrandTable from "./brand-table";

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

      <div className="!mt-12">
        <BrandTable />
      </div>
    </div>
  );
}

import React from "react";
import TransactionTable from "./transaction-table";
import { TrendingUp } from "lucide-react";
import { siPaypal } from "simple-icons";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6 space-y-3!">
      <h3 className="text-3xl font-semibold">Transactions</h3>
      <h3 className="text-lg font-semibold">Overview</h3>
      <p className="text-sm text-muted-foreground font-medium">
        Activities summary at a glance{" "}
      </p>
      <div className="grid grid-cols-2 gap-6 !pr-6 mb-12!">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            className="h-[200px] border rounded-lg flex flex-col justify-around items-start !p-6"
            key={i}
          >
            <div className="bg-secondary !p-2 rounded-xl">
              {/* <Users2Icon fill="#176BB3" stroke="#176BB3" /> */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siPaypal.path} />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-4xl">37k</h2>
              <TrendingUp color="#00aa00" />
            </div>
            <h3 className="text-xl font-semibold">Active Users</h3>
            <p className="font-medium text-[#A8A8A8]">
              0.5k increase than last 7 days
            </p>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-semibold">All Transactions</h3>
      <p className="text-sm font-semibold text-muted-foreground">
        Overall details of transactions
      </p>
      <TransactionTable />
    </div>
  );
}

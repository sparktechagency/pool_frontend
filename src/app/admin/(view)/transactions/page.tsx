import React from "react";
import TransactionTable from "./transaction-table";
import { TrendingUp, TriangleDashedIcon } from "lucide-react";
import { siPaypal } from "simple-icons";
import { cookies } from "next/headers";
import { getTransactionApi } from "@/lib/api/admin/admin";

export default async function Page() {
  const token = (await cookies()).get("ghost")?.value;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const call: any = await getTransactionApi(1, token ?? "");
  if (!call.status) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        {call.message ?? "Failed to fetch data from server"}
      </div>
    );
  }
  return (
    <div className="!pb-12 !pr-6 space-y-3!">
      <h3 className="text-3xl font-semibold">Transactions</h3>
      <h3 className="text-lg font-semibold">Overview</h3>
      <p className="text-sm text-muted-foreground font-medium">
        Activities summary at a glance{" "}
      </p>
      <div className="grid grid-cols-2 gap-6 !pr-6 mb-12!">
        <div className="h-[200px] border rounded-lg flex flex-col justify-around items-start !p-6">
          <div className="bg-secondary !p-2 rounded-xl">
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
            <h2 className="font-bold text-4xl">{call.transactions}</h2>
            <TrendingUp color="#00aa00" />
          </div>
          <h3 className="text-xl font-semibold">Transactions</h3>
          <p className="font-medium text-[#A8A8A8]">
            {call.up_down_transactions}
          </p>
        </div>
        <div className="h-[200px] border rounded-lg flex flex-col justify-around items-start !p-6">
          <div className="bg-secondary !p-2 rounded-xl">
            <TriangleDashedIcon />
          </div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-4xl">{call.revenues}</h2>
            <TrendingUp color="#00aa00" />
          </div>
          <h3 className="text-xl font-semibold">Revenues</h3>
          <p className="font-medium text-[#A8A8A8]">{call.up_down_revenues}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold">All Transactions</h3>
      <p className="text-sm font-semibold text-muted-foreground">
        Overall details of transactions
      </p>
      {token && <TransactionTable token={token} />}
    </div>
  );
}

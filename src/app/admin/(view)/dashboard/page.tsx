"use client";
import {
  BanknoteArrowUpIcon,
  BlocksIcon,
  Loader2Icon,
  TrendingUp,
  Users2Icon,
} from "lucide-react";
import React from "react";
import { ChartPart } from "./chart-part";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getDashboardApi } from "@/lib/api/admin/admin";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";

export default function Page() {
  const [cookies] = useCookies(["ghost"]);
  const [timeRange, setTimeRange] = React.useState<"7" | "30" | "90">("7");
  const { data, isPending }: AnyType = useQuery({
    queryKey: ["dboard", timeRange],
    queryFn: () => {
      return getDashboardApi(timeRange, cookies.ghost);
    },
  });
  return (
    <>
      <div className="!pb-6 ">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Activities summary at a glance{" "}
        </p>
      </div>
      <div className="flex justify-end my-6 !pr-6">
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as "7" | "30" | "90")}
        >
          <SelectTrigger className="w-[160px] rounded-lg border-0 shadow-none">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-6 !pr-6">
        {[
          {
            label: "Active Users",
            amm: data?.active_users,
            ud: data?.up_down_active_users,
            ico: <Users2Icon fill="#176BB3" stroke="#176BB3" />,
          },
          {
            label: "Transactions",
            amm: data?.transactions,
            ud: data?.up_down_transactions,
            ico: <BanknoteArrowUpIcon fill="#16A34A" stroke="#16A34A" />,
          },
          {
            label: "Revenues",
            amm: data?.revenues,
            ud: data?.up_down_revenues,
            ico: <BlocksIcon fill="#DC2626" stroke="#DC2626" />,
          },
        ].map((x, i) => (
          <div
            key={i}
            className="aspect-[2/1] border rounded-lg flex flex-col justify-around items-start !p-6"
          >
            {isPending ? (
              <div className="flex justify-center items-center w-full h-full">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              <>
                <div className="bg-secondary !p-2 rounded-xl">{x.ico}</div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-4xl">{x.amm}</h2>
                  <TrendingUp color="#00aa00" />
                </div>
                <h3 className="text-xl font-semibold">{x.label}</h3>
                <p className="font-medium text-[#A8A8A8]">{x.ud}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="!mt-6 !pr-6">
        <ChartPart />
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getChartApi } from "@/lib/api/admin/admin";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";

const chartConfig = {
  active_users: { label: "Active Users", color: "hsl(var(--chart-1))" },
  transactions: { label: "Transactions", color: "hsl(var(--chart-2))" },
  revenues: { label: "Revenues", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export function ChartPart() {
  const [cookies] = useCookies(["ghost"]);
  const { data, isPending }: AnyType = useQuery({
    queryKey: ["dbchart"],
    queryFn: () => getChartApi(cookies.ghost),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  // merge datasets into one array
  const chartData =
    data?.active_users_chart?.map((item: any, idx: number) => ({
      date: item.date,
      day: item.day,
      active_users: Number(item.count) || 0,
      transactions: Number(
        data.transactions_chart[idx]?.total_transactions ?? 0
      ),
      revenues: Number(data.revenues_chart[idx]?.total_amount ?? 0),
    })) ?? [];

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0! border-b !py-0 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardDescription>Statistics Analytics</CardDescription>
          <CardTitle className="text-3xl font-bold">Revenues</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2! pt-4! sm:px-6! sm:pt-6!">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillActive" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#1EE9B6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1EE9B6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillTransactions" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#6F8AF8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6F8AF8" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRevenues" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#D96FF8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D96FF8" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            {/* Active Users */}
            <Area
              dataKey="active_users"
              type="monotone"
              stroke="#1EE9B6"
              fill="url(#fillActive)"
              stackId="a"
            />
            {/* Transactions */}
            <Area
              dataKey="transactions"
              type="monotone"
              stroke="#6F8AF8"
              fill="url(#fillTransactions)"
              stackId="a"
            />
            {/* Revenues */}
            <Area
              dataKey="revenues"
              type="monotone"
              stroke="#D96FF8"
              fill="url(#fillRevenues)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

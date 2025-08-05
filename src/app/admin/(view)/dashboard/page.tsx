"use client";
import { TrendingUp, Users2Icon } from "lucide-react";
import React from "react";
import { ChartPart } from "./chart-part";
export default function Page() {
  return (
    <>
      <div className="!pb-6 ">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Activities summary at a glance{" "}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 !pr-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className="aspect-[2/1] border rounded-lg flex flex-col justify-around items-start !p-6"
            key={i}
          >
            <div className="bg-secondary !p-2 rounded-xl">
              <Users2Icon fill="#176BB3" stroke="#176BB3" />
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
      <div className="!mt-6 !pr-6">
        <ChartPart />
      </div>
    </>
  );
}

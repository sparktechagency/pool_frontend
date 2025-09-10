import Bread from "@/components/core/bread";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Subscriber from "./subscriber";
import { AnyType } from "@/lib/config/error-type";
import { getSubscriptionProvApi } from "@/lib/api/admin/admin";

export type SubscriptionDetailsType = {
  id: number;
  plan_name: string;
  number_of_quotes: number;
  price: string;
  created_at: string;
  updated_at: string;
  cost?: number;
};

export default async function Page() {
  const call: AnyType = await getSubscriptionProvApi();

  if (!call.status) {
    return (
      <main>
        <Bread />
        <div className="mt-12 flex justify-center items-center">
          <p>Something went wrong</p>
        </div>
      </main>
    );
  }

  const subs: SubscriptionDetailsType[] = call.subscriptions;

  // Optional: define colors/icons dynamically (or fallback if you want)
  const colors = ["#96FA9A", "#A7F3D0", "#93C5FD", "#FCD34D"];
  const icons = [
    "/icon/free_891438 1.svg",
    "/icon/ghana_16936952 1.svg",
    "/icon/star_10642390 1.svg",
    "/icon/ESSENTIAL UI.svg",
  ];

  return (
    <main>
      <Bread />
      <div className="h-[60dvh] w-full flex justify-center items-center flex-col bg-blue-900 text-background gap-6">
        <h2 className="text-6xl font-bold">Start Your Journey</h2>
        <p className="text-lg">Find the right plan to boost your business.</p>
      </div>

      <div className="w-full p-6 grid grid-cols-4 gap-6">
        {subs.map((sub, i) => {
          const costNum = parseFloat(sub.price);
          return (
            <div key={sub.id}>
              <div className="text-center">
                <h5 className="text-lg font-semibold">{sub.plan_name}</h5>
                <p className="text-sm">
                  Subscribe to this plan to access bidding
                </p>
              </div>
              <div
                className={cn(
                  "flex-col gap-6 w-full aspect-video rounded-xl mt-6 flex justify-between p-6 items-center"
                )}
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                <Image
                  src={icons[i % icons.length]}
                  height={64}
                  width={64}
                  alt="icon"
                  className="size-10"
                />
                <h4 className="text-2xl font-bold">${costNum}/month</h4>
                <p className="font-semibold">
                  Can bid {sub.number_of_quotes} quotes
                </p>
                <Subscriber i={i} x={{ ...sub, cost: costNum }} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

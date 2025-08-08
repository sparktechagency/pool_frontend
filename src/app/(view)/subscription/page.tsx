import Bread from "@/components/core/bread";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Subscriber from "./subscriber";
const subscriptionDetails = [
  {
    title: "Get Free",
    sub: "Subscribe to basic for get access to bidding",
    ico: "/icon/free_891438 1.svg",
    cost: 0,
    costString: "$0.0",
    bid: 2,
    button: "Use for free",
    color: "#96FA9A",
  },

  {
    title: "Get Standard",
    sub: "Subscribe to basic for get access to bidding",
    ico: "/icon/star_10642390 1.svg",
    costString: "$99.0/month",
    cost: 99.0,
    bid: 49,
    button: "Manage Plan",
    color: "#93C5FD",
  },

  {
    title: "Get Basic",
    sub: "Subscribe to basic for get access to bidding",
    ico: "/icon/ghana_16936952 1.svg",
    costString: "$5.99/month",
    cost: 5.99,
    bid: 5,
    button: "Manage Plan",
    color: "#A7F3D0",
  },
  {
    title: "Get Premium",
    sub: "Subscribe to basic for get access to bidding",
    ico: "/icon/ESSENTIAL UI.svg",
    costString: "$247.0/month",
    cost: 247.0,
    bid: "unlimited",
    button: "Manage Plan",
    color: "#FCD34D",
  },
];
export type SubscriptionDetailsType = (typeof subscriptionDetails)[number];
export default function Page() {
  return (
    <main>
      <Bread />
      <div className="h-[60dvh] w-full flex justify-center items-center flex-col bg-blue-900 text-background gap-6">
        <h2 className="text-6xl font-bold">Start Your Journey</h2>
        <p className="text-lg">Find the right plan to boost your buissness.</p>
      </div>
      <div className="w-full p-6 grid grid-cols-4 gap-6">
        {subscriptionDetails.map((x, i) => (
          <div className="" key={x.cost + x.title}>
            <div className="text-center">
              <h5 className="text-lg font-semibold">{x.title}</h5>
              <p className="text-sm">{x.sub}</p>
            </div>
            <div
              className={cn(
                "flex-col  gap-6 w-full aspect-video rounded-xl mt-6 flex justify-between p-6 items-center"
              )}
              style={{ backgroundColor: x.color }}
            >
              <Image
                src={x.ico}
                height={64}
                width={64}
                alt="icon"
                className="size-10"
              />
              <h4 className="text-2xl font-bold">{x.costString}</h4>
              <p className="font-semibold">Can bid {x.bid} quotes</p>
              <Subscriber i={i} x={x} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

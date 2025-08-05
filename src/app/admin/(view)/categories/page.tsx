import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6 space-y-3!">
      <h3 className="text-3xl font-semibold">Manage Preference Categories</h3>
      <div className="w-full space-y-6!">
        {serviceList.map((x, i) => (
          <Card key={i}>
            <CardContent className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={x.icon}
                  height={24}
                  width={24}
                  className="size-6"
                  alt={x.title}
                />
                <span>{x.title}</span>
              </div>
              <div className="">
                <Button variant="ghost" className="text-accent-foreground">
                  <Edit3Icon />
                </Button>
                <Button variant="ghost" className="text-destructive">
                  <Trash2Icon />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
const serviceList = [
  {
    icon: "/icon/brush.svg",
    title: "Pool Cleaning",
  },
  {
    icon: "/icon/equipment.svg",
    title: "Repairs & Equipment",
  },
  {
    icon: "/icon/swimming-pool.svg",
    title: "Pool Construction",
  },
  {
    icon: "/icon/pump.svg",
    title: "Filter & Pump Issue",
  },
  {
    icon: "/icon/farm-house.svg",
    title: "Pool Inspection",
  },
  {
    icon: "/icon/smartphone.svg",
    title: "Lighting & Automation",
  },
];

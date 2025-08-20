"use client";
import {
  CategoriesIcon,
  DashboardIcon,
  ProductListingIcon,
  SettingIcon,
  SubscriptionIcon,
  UsersIcon,
  WithdrawIcon,
} from "./localIcons";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function AdminSideMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState("dashboard");

  useEffect(() => {
    const pathParts = pathname.split("/");
    const extractedKey = pathParts[pathParts.length - 1] || "dashboard";
    setCurrent(extractedKey);
  }, [pathname]);

  const handleClick = (key: string) => {
    if (key === "/home") {
      router.push(key);
      return;
    }
    setCurrent(key);
    router.push(`/admin/${key}`);
  };

  const items = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <DashboardIcon className="size-6" />,
    },
    {
      label: "Manage Users",
      key: "users",
      icon: <UsersIcon className="size-6" />,
    },
    {
      label: "Quote Listing",
      key: "quotes",
      icon: <ProductListingIcon className="size-6" />,
    },
    {
      label: "Transactions",
      key: "transactions",
      icon: <WithdrawIcon className="size-6" />,
    },
    {
      label: "Categories",
      key: "categories",
      icon: <CategoriesIcon className="size-6" />,
    },
    {
      label: "Subscription",
      key: "subscription",
      icon: <SubscriptionIcon className="size-6" />,
    },
    // { label: "Chat", key: "chat", icon: <ChatsIcon className="size-6" /> },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingIcon className="size-6" />,
    },
    {
      label: "Manage contents",
      key: "content",
      icon: <SettingIcon className="size-6" />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 !mt-6">
      {items.map((x, i) => (
        <div key={i} className="">
          <Button
            onClick={() => handleClick(x.key)}
            variant={current === x.key ? "default" : "ghost"}
            size="lg"
            className={cn("w-full justify-start gap-2 text-[#B0B0B0]", {
              "bg-muted !text-accent-foreground font-bold": current === x.key,
            })}
          >
            {x.icon} {x.label}
          </Button>
        </div>
      ))}
    </div>
  );
}

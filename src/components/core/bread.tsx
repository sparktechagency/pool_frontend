"use client";
import React from "react";
import { HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
export default function Bread() {
  const path = usePathname();
  const relier = () => {
    return relatives.find((x) => x.path === path)?.label;
  };
  return (
    <div className="px-12! py-6! bg-zinc-100">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex gap-2 items-center">
              <HomeIcon className="size-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{relier()}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

const relatives = [
  { path: "/top-providers", label: "Top Providers" },
  { path: "/get-service", label: "Service categories" },
  { path: "/my-orders", label: "My orders" },
];

"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/lib/api/auth/auth";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { AnyType } from "@/lib/config/error-type";
import { serverImageBuilder } from "@/lib/formatter";
export default function AdminUser() {
  const [cookies] = useCookies(["adminGhost"]);
  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: (): AnyType => {
      return getProfileApi(cookies.adminGhost);
    },
  });

  return (
    <div className="flex items-center gap-2">
      {/* {!isPending && data.data.avatar} */}
      <Avatar>
        <AvatarImage
          src={
            isPending
              ? "https://avatar.iran.liara.run/public/pending.png"
              : data?.data?.avatar
              ? serverImageBuilder(data.data.avatar)
              : "https://avatar.iran.liara.run/public/default.png"
          }
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      {isPending ? (
        <Loader2Icon className="animate-spin size-4" />
      ) : (
        data.data.full_name
      )}
    </div>
  );
}

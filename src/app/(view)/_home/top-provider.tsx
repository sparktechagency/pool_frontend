import React from "react";
import { testimonials } from "./testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";
import { getProfileApi } from "@/lib/api/auth/auth";

export default async function TopProviders() {
  const token = (await cookies()).get("ghost")?.value;
  if (!token) {
    return <></>;
  }
  const call: AnyType = await getProfileApi(token);
  if (call?.data?.role === "PROVIDER") {
    return <></>;
  }

  return (
    <>
      <h2 className="text-accent-foreground text-3xl text-center mt-24!">
        Top Providers
      </h2>
      <div className="w-4/5 py-12! grid grid-cols-2 lg:grid-cols-5 gap-6 mx-auto!">
        {testimonials.slice(0, 5).map((x, y) => (
          <div className={`flex flex-col items-center gap-2`} key={y}>
            <Avatar className="size-16 border-2 border-white shadow-lg">
              <AvatarImage src={x.avatar} alt="avatar" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                {x.initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium text-sm">{x.name}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="text-[#FFD700] size-4"
                    stroke="#FFD700"
                    fill="#FFD700"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center items-center">
        <Button size="lg" className="mt-12!" asChild>
          <Link href="/top-providers">See All</Link>
        </Button>
      </div>
    </>
  );
}

"use client";

import React from "react";
import { MailIcon, MapPinIcon, StarHalfIcon, StarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnyType } from "@/lib/config/error-type";
import { useQuery } from "@tanstack/react-query";
import { getProviderApi } from "@/lib/api/core/core";
import { useCookies } from "react-cookie";
import { serverImageBuilder } from "@/lib/formatter";

export default function ProviderCard({ id }: { id: string | number }) {
  const [cookies] = useCookies(["ghost"]);
  const { data, isError, error }: AnyType = useQuery({
    queryKey: ["provider", id],
    queryFn: () => getProviderApi(id, cookies.ghost),
  });

  if (isError) {
    return (
      <div>
        <div>
          <div>Provider Details</div>
        </div>
        <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
          <code className="whitespace-pre-wrap">
            {JSON.stringify(error, null, 2)}
          </code>
        </pre>
      </div>
    );
  }

  const provider = data?.provider;

  return (
    <div>
      <div className="flex flex-col justify-around items-center gap-2">
        <Avatar className="size-24">
          <AvatarImage
            src={
              provider?.avatar ??
              serverImageBuilder(provider?.avatar) ??
              `https://avatar.iran.liara.run/public/${1}`
            }
          />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <h3 className="text-center text-2xl">{provider?.full_name || "N/A"}</h3>
        <p className="flex items-center gap-1 text-accent-foreground">
          <MailIcon className="size-5" />
          {provider?.email || "No email"}
        </p>
        <p className="flex items-center gap-1 text-accent-foreground">
          <MapPinIcon className="size-5" />
          {provider?.location || "No address"}
        </p>
        <div className="border rounded-lg w-full py-3 px-2 divide-y space-y-3">
          <div className="grid grid-cols-2">
            <p className="font-semibold">Service Rating</p>
            <div className="flex items-center gap-1">
              <span>{provider?.rating || "N/A"}</span>
              <StarIcon fill="#FFD700" stroke="" />
              <StarIcon fill="#FFD700" stroke="" />
              <StarIcon fill="#FFD700" stroke="" />
              <StarIcon fill="#FFD700" stroke="" />
              <StarHalfIcon fill="#FFD700" stroke="" />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-semibold">Order Completed</p>
            <div>{provider?.ordersCompleted || 0}</div>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-semibold">Canceled Orders</p>
            <div>{provider?.ordersCanceled || 0}</div>
          </div>
        </div>
        <h4 className="text-center">What home owners say?</h4>
        <div className="h-[200px] w-full border rounded-lg overflow-y-scroll">
          {provider?.reviews?.length > 0 ? (
            provider?.reviews.map((review: AnyType, ll: number) => (
              <Card className="border-0 shadow-none" key={review.id || ll}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarImage
                          src={
                            review?.avatarUrl ||
                            `https://avatar.iran.liara.run/public/${ll}`
                          }
                        />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <h3>{review.name || "Anonymous"}</h3>
                    </div>
                    <p className="flex items-center text-sm">
                      <StarIcon
                        fill="#FFD700"
                        stroke=""
                        className="size-5 mr-1"
                      />
                      {review.rating || "N/A"}
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {review.comment || "No comment available."}
                  </CardDescription>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center p-4">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

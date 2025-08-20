import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  MailIcon,
  MapPin,
  PackageMinusIcon,
  StarIcon,
} from "lucide-react";
import { getProviderApi, viewQuoteApi } from "@/lib/api/core/core";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";
import { serverImageBuilder } from "@/lib/formatter";
import Controller from "./controller";
import Link from "next/link";

export default async function Details({
  id,
  quoteId,
  xxx,
}: {
  id: string | number;
  quoteId: string | number;
  xxx: string;
}) {
  const token = (await cookies()).get("ghost")?.value;

  if (!token) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        Please log in first
      </div>
    );
  }
  if (!id) {
    return <div>No provider ID found in search params</div>;
  }

  const call: AnyType = await getProviderApi(id, token);
  if (!call.status) {
    return <div>{call.message ?? "Failed to fetch data from server"}</div>;
  }
  const user = call.provider;
  const quoteCall: AnyType = await viewQuoteApi(quoteId, token);
  if (!quoteCall.status) {
    return <div>{call.message ?? "Failed to fetch data from server"}</div>;
  }
  const quote = quoteCall.data;
  console.log(quoteCall);

  return (
    <section className="w-10/11 mx-auto! my-12! grid grid-cols-3 gap-6">
      <div className="flex flex-col justify-start items-center gap-4">
        <Avatar className="size-34">
          <AvatarImage
            src={
              serverImageBuilder(user.avatar) ??
              `https://avatar.iran.liara.run/public`
            }
          />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl text-center font-semibold">{user.full_name}</h3>
        <p className="flex gap-1 items-center text-accent-foreground">
          <MailIcon className="size-5" />
          {user.email}{" "}
        </p>
        <p className="flex gap-1 items-center text-accent-foreground">
          <MapPin className="size-5" />
          {user.location ?? "N/A"}
        </p>
      </div>
      <div className="space-y-6!">
        <Card>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="">
              <h3 className="text-muted-foreground">Service Rating </h3>
              <p className="flex items-center gap-1 font-semibold">
                <StarIcon fill="#FFD700" stroke="" className="size-5" />{" "}
                {user.average_rating}
              </p>
            </div>
            <div className="">
              <h3 className="text-muted-foreground">Order Completed</h3>
              <p className="font-semibold flex items-center gap-1">
                <CheckCircle2 fill="#2DC845" stroke="#ffffff" />{" "}
                {user.profile.completed_services}
              </p>
            </div>
            <div className="">
              <h3 className="text-muted-foreground">Canceled Orders</h3>
              <p className="font-semibold flex items-center gap-1">
                <PackageMinusIcon fill="#F34848" stroke="#333333" />
                {user.profile.canceled_order}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quote Outline</CardTitle>
            <CardDescription>{quote.describe_issue}</CardDescription>
          </CardHeader>
        </Card>
        <div className="w-full flex flex-row justify-between items-center">
          <Button variant="outline" className="rounded-full" size="lg" asChild>
            <Link href={`/chat?id=${user.id}`}>
              <MailIcon /> Chat with {user.full_name}
            </Link>
          </Button>

          {id && (
            <Controller
              prov={id}
              id={quote.id}
              status={quote.status}
              xxx={xxx}
            />
          )}
        </div>
      </div>
      <div className="space-y-6!">
        <h3 className="text-xl font-semibold">What home owners say?</h3>
        {call.reviews.length > 0 ? (
          <div className="h-[400px] w-full border rounded-lg overflow-y-scroll">
            {call.reviews.map((x: AnyType, ll: number) => (
              <Card className="border-0! shadow-none!" key={ll}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarImage
                          src={
                            serverImageBuilder(x.user.avatar) ??
                            `https://avatar.iran.liara.run/public/${ll}`
                          }
                        />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <h3 className="">{x.user.full_name}</h3>
                    </div>
                    <p className="flex items-center text-sm">
                      <StarIcon
                        fill="#FFD700"
                        stroke=""
                        className="size-5 mr-1!"
                      />
                      {x.rating}
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{x.compliment}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className={`flex justify-center items-center h-24 mx-auto font-semibold border rounded-lg text-muted-foreground`}
          >
            No reviews
          </div>
        )}
      </div>
    </section>
  );
}

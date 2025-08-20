import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { AnyType } from "@/lib/config/error-type";
import { InfoIcon, Loader2Icon, MailIcon, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { serverImageBuilder } from "@/lib/formatter";
import { CurrentAplanApi, ViewBrowsedQuoteApi } from "@/lib/api/core/core";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function Details({ id }: { id: string | number }) {
  const token = (await cookies()).get("ghost")?.value;
  if (!token) {
    return notFound();
  }
  const call: AnyType = await ViewBrowsedQuoteApi(id, token ?? "");
  const data = call?.data;
  const planCall: AnyType = await CurrentAplanApi(token);
  if (!data) {
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      <Loader2Icon className={`animate-spin`} />
    </div>;
  }
  console.log(planCall);

  return (
    <div className="w-full lg:px-[7%] grid grid-cols-2 gap-6 mx-auto">
      <div className="col-span-2">
        <h1 className="text-3xl text-center mt-6">Order Details</h1>
        {planCall?.current_plan ? (
          <div className="rounded-lg bg-green-500/40 p-6 flex flex-row justify-between items-center mt-6 w-1/2 mx-auto!">
            <div className="flex flex-col">
              <h4 className="font-bold">{planCall?.current_plan?.plan_name}</h4>
              <p className="text-muted-foreground text-sm">
                Your have total {planCall?.current_plan?.total_quotes} quotes
                remaining
              </p>
            </div>
            <Button
              variant={"outline"}
              className="rounded-full border-0!"
              size={"sm"}
              asChild
            >
              <Link href={"/subscription"}>See all plans</Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-lg bg-red-500/40 border-2 border-red-500 p-6 flex flex-row justify-between items-center mt-6 w-1/2 mx-auto!">
            <div className="flex flex-col">
              <h4 className="font-bold">{planCall?.message}</h4>
            </div>
            <Button
              variant={"outline"}
              className="rounded-full border-0!"
              size={"sm"}
              asChild
            >
              <Link href={"/subscription"}>See all plans</Link>
            </Button>
          </div>
        )}
        <div
          className={cn(
            "py-2 px-6 w-fit mx-auto my-12 rounded-lg flex justify-center items-center font-semibold text-xl",
            data.status === "Pending"
              ? "bg-amber-200"
              : data.status === "In progress"
              ? "bg-blue-200"
              : "bg-green-200"
          )}
        >
          {data.status}
        </div>
        <p className="font-semibold text-center items-center mx-auto w-fit flex justify-center gap-2 mt-6 text-muted-foreground text-sm">
          <InfoIcon className="size-5" />
          After accept by home owners you can start the service.
        </p>
      </div>
      <div className="">
        <h1 className="text-3xl text-center my-6">Owners Information</h1>
        <div className="flex w-full flex-col justify-center items-center pb-12">
          <Avatar className="size-34">
            <AvatarImage
              src={
                serverImageBuilder(data?.user?.avatar) ??
                "/public/icon/play-store.png"
              }
            />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl mt-6 font-semibold">
            {data?.user?.full_name}
          </h2>
          <p className="flex items-center gap-1 text-xs mt-3">
            <MailIcon className="size-4" />
            {data?.user?.email}
          </p>
          <p className="flex items-center gap-1 text-xs mt-3">
            <MapPin className="size-4" />
            {data?.user?.location ?? "N/A"}
          </p>
        </div>
        <div className="bg-secondary p-6 rounded-lg grid grid-cols-2 gap-6">
          <div className="">
            <h4 className="text-muted-foreground">Completed services</h4>
            <p>{data?.user.profile?.completed_services}</p>
          </div>
          <div className="">
            <h4 className="text-muted-foreground">Canceled order</h4>
            <p>25</p>
          </div>
        </div>
        <div className="my-12 grid grid-cols-2 gap-6">
          <Button variant={"outline"} className="rounded-full" asChild>
            <Link href={`/chat?id=${data?.user?.profile?.id ?? ""}`}>
              <MailIcon />
              Chat
            </Link>
          </Button>
          <Button className="rounded-full" asChild>
            <Link href={"/service"}>Track the service</Link>
          </Button>
        </div>
      </div>
      <div className="">
        <Image
          src={
            data?.photos[0]
              ? serverImageBuilder(data?.photos[0])
              : "/image/4e715d20e2d1e1d0581a8ea5248dc8c918ce46db.jpg"
          }
          height={1200}
          width={800}
          alt="image"
          className="aspect-video border rounded-xl w-full mx-auto my-12 object-contain"
        />
        <div className="p-4 font-semibold text-muted-foreground bg-secondary rounded-lg flex justify-center items-center">
          Order summery
        </div>
        <div className="grid grid-cols-2 gap-6 py-6">
          <p>Service:</p>
          <p>{data?.service}</p>

          <p>Request Date:</p>
          <p>{data?.date}</p>

          <p>Service Time:</p>
          <p>{data?.time}</p>

          <p>Location:</p>
          <p>{data?.address}</p>

          <p>Notes:</p>
          <p>{data?.describe_issue}</p>
        </div>
      </div>
    </div>
  );
}

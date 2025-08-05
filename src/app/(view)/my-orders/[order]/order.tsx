import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { viewQuoteApi } from "@/lib/api/core/core";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";
import { Card, CardContent } from "@/components/ui/card";
import { serverImageBuilder } from "@/lib/formatter";

export default async function Order({ id }: { id: string }) {
  const token = (await cookies()).get("ghost")?.value;

  if (!token) {
    return (
      <Card>
        <CardContent>You must be logged in first</CardContent>
      </Card>
    );
  }

  const call: AnyType = await viewQuoteApi(id, token as string);

  if (!call.data) {
    return (
      <Card>
        <CardContent>Something went wrong</CardContent>
      </Card>
    );
  }

  const data = call?.data;
  const dataset = [
    { for: "Service", is: data.service },
    { for: "Request Date", is: data.date },
    { for: "Service Time", is: data.time },
    { for: "Location", is: data.address },
    { for: "Notes", is: data.describe_issue },
  ];

  return (
    <div className="w-2/3 mx-auto!">
      <h1 className="text-3xl mb-6!">Order Details </h1>
      <div className="w-full py-3! px-2! text-lg flex justify-between items-center bg-secondary">
        <h3>Order Summary</h3>
        <p className="flex items-center gap-1 text-amber-500">
          <span className="size-1.5 bg-amber-500 rounded-full" />
          {data.status}
        </p>
      </div>
      <div className="">
        {dataset.map((x, i) => (
          <div
            className="w-full py-3! px-2! text-base flex justify-between items-center font-semibold"
            key={i}
          >
            <h3>{x.for}:</h3>
            <p className="">{x.is}</p>
          </div>
        ))}
      </div>
      <div className=" mt-12! space-y-6!">
        <h3 className="text-2xl">Attachments</h3>
        <Image
          src={serverImageBuilder(data.photos[0])}
          width={1200}
          height={800}
          className="w-full aspect-video object-center object-contain rounded-xl"
          alt="image"
        />
        <Button className="w-full bg-[#003B73]" size="lg" asChild>
          <Link href={`/my-orders/${id}/bids`}>Check Bidding</Link>
        </Button>
      </div>
      <div className="mt-12! space-y-4!">
        <h2 className="text-3xl font-semibold">Payment Info</h2>
        <p>
          Your payment will be held securely in escrow and only released after
          the job is completed.
        </p>
        <div className="flex flex-row justify-between items-center">
          <Button
            className="bg-red-100 hover:bg-red-200 text-red-500"
            size="lg"
          >
            Cancel Request
          </Button>
        </div>
      </div>
    </div>
  );
}

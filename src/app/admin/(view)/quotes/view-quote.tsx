"use client";
import { adminViewQuoteApi } from "@/lib/api/admin/admin";
import { AnyType } from "@/lib/config/error-type";
import { serverImageBuilder } from "@/lib/formatter";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";

export default function ViewQuote({ id }: { id: string | number }) {
  const [cookies] = useCookies(["ghost"]);

  const { data, isPending }: AnyType = useQuery({
    queryKey: ["quote", id],
    queryFn: () => adminViewQuoteApi(id, cookies.ghost),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  const x = data?.quote;

  return (
    <div className="w-full bg-card text-card-foreground rounded-xl overflow-hidden">
      {/* Image */}
      {x.photos?.length > 0 && (
        <Image
          src={serverImageBuilder(JSON.parse(x.photos)[0])}
          height={600}
          width={800}
          alt="quote_image"
          className="aspect-video object-cover w-full"
        />
      )}

      {/* Description */}
      <div className="p-4 border-b">
        <p className="font-semibold text-lg mb-2">{x.describe_issue}</p>
      </div>

      {/* Details */}
      <div className="p-4 grid grid-cols-2 gap-y-2 text-sm">
        <div className="font-medium">Category</div>
        <div>{x.service}</div>

        <div className="font-medium">Property type</div>
        <div>{x.property_type}</div>

        <div className="font-medium">Service date</div>
        <div>{x.date}</div>

        <div className="font-medium">Time</div>
        <div>{x.time}</div>

        <div className="font-medium">Pool depth</div>
        <div>{x.pool_depth} m</div>

        <div className="font-medium">Zip code</div>
        <div>{x.zip_code}</div>

        <div className="font-medium">Address</div>
        <div>{x.address}</div>

        <div className="font-medium">Expected budget</div>
        <div>${x.expected_budget}</div>

        <div className="font-medium">Status</div>
        <div>{x.status}</div>
      </div>
    </div>
  );
}

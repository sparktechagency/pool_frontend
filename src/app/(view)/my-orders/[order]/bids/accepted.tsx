import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2Icon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAcceptedBidsApi } from "@/lib/api/core/core";
import { encrypt, serverImageBuilder } from "@/lib/formatter";
import { AnyType } from "@/lib/config/error-type";

export default function Accepted({ id }: { id: string | number }) {
  const [cookies] = useCookies(["ghost"]);
  const { data, isPending, isError, error }: AnyType = useQuery({
    queryKey: ["bids"],
    queryFn: () => {
      return getAcceptedBidsApi(id, cookies.ghost);
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        {error?.data?.message}
      </div>
    );
  }
  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="text-center">Provider</TableHead>
          <TableHead className="text-center">Price Offered</TableHead>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.data?.map((x: AnyType) => (
          <TableRow key={x.id}>
            <TableCell className="font-semibold flex items-center gap-2 justify-center">
              <Avatar>
                <AvatarImage
                  src={
                    serverImageBuilder(x.provider.avatar) ??
                    `https://avatar.iran.liara.run/public/${1}`
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              {x.provider.full_name}
            </TableCell>
            <TableCell className="font-medium text-center">
              ${x.price_offered}
            </TableCell>
            <TableCell className="text-center flex gap-1 justify-center">
              <StarIcon fill="#FFD700" stroke="" className="size-5" />{" "}
              {x.average_rating}
            </TableCell>
            <TableCell className="text-center">
              <Button variant="ghost" asChild>
                <Link
                  href={`bids/details?id=${x.provider.id}&quote=${
                    x.id
                  }&xxx=${encrypt(x.price_offered)}`}
                >
                  View Details <ArrowRight />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

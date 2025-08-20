"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnyType } from "@/lib/config/error-type";
import React from "react";
import BidForm from "./bid-form";
import { useMutation } from "@tanstack/react-query";

import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { AcceptQuoteApi } from "@/lib/api/core/core";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Bidder({
  data,
  point,
}: {
  data: AnyType;
  point: string | number;
}) {
  const [cookies] = useCookies(["ghost"]);
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["bid"],
    mutationFn: ({ id, token }: { id: string | number; token: string }) => {
      return AcceptQuoteApi(id, token);
    },
  });
  // expected = data.
  // if (String(expected) !== "0.00") {
  //   return <Button className="w-full rounded-full">View Your Bid</Button>;
  // }
  return (
    <div className="w-full grid grid-cols-2 gap-4 my-6">
      {data?.service_type === "pool service" && (
        <Button
          variant={"outline"}
          className="rounded-full"
          onClick={async () => {
            mutate(
              { id: data.id, token: cookies.ghost as string },
              {
                onError: (err) => {
                  toast.error(err.message ?? "Failed to accept budget");
                },
                onSuccess: (data: AnyType) => {
                  if (data) {
                    if (!data.status) {
                      toast.error(data.message ?? "Failed to accept budget");
                    } else {
                      toast.success(
                        data.message ?? "Successfully accepted the budget"
                      );
                      navig.push("/");
                    }
                  }
                },
              }
            );
          }}
        >
          {!isPending ? (
            "Accept Budget"
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </Button>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "rounded-full",
              data?.service_type !== "pool service" && "col-span-2"
            )}
          >
            Start bidding
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {!point || String(point) === "0"
                ? "You dont have any current plan"
                : "Add your bid price"}
            </DialogTitle>
          </DialogHeader>
          <BidForm id={data.id} point={point} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

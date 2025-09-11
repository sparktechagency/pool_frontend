"use client";
import { Button } from "@/components/ui/button";
import { cancelBidApi } from "@/lib/api/core/core";
import { AnyType } from "@/lib/config/error-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function CancelBid() {
  const [{ ghost }] = useCookies(["ghost"]);
  const bid_id = useSearchParams().get("bid_id");
  const qCl = useQueryClient();
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["cancel_bid"],

    mutationFn: () => {
      return cancelBidApi(bid_id!, ghost);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: AnyType) => {
      toast.success(data.message ?? "Successfully marked as complete");
      qCl.invalidateQueries({ queryKey: ["quotes"] });
      navig.push("/service");
    },
  });
  return (
    <Button
      className="rounded-full"
      onClick={() => {
        mutate();
      }}
    >
      Cancel Bid
    </Button>
  );
}

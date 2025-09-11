"use client";
import { Button } from "@/components/ui/button";
import { completeBidApi } from "@/lib/api/core/core";
import { AnyType } from "@/lib/config/error-type";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function MarkComplete({ id }: { id?: string }) {
  const [{ ghost }] = useCookies(["ghost"]);
  const bid_id = useSearchParams().get("bid_id");

  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["mark_as_complete"],
    mutationFn: () => {
      return completeBidApi(bid_id!, ghost);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (data: AnyType) => {
      toast.success(data.message ?? "Successfully marked as complete");
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
      Mark as complete
    </Button>
  );
}

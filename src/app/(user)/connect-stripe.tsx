"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { BASE_API_ENDPOINT } from "@/lib/config/data";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

export default function ConnectStripe() {
  const navig = useRouter();
  const [cookies] = useCookies(["ghost"]);

  // Mutation for creating stripe account
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${BASE_API_ENDPOINT}/provider/create-connected-account`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.ghost}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to complete this request");
      }

      return res.json();
    },
    onSuccess: (data: any) => {
      // console.log(data);
      toast.success("You will be redirected to stripe");
      navig.push(data.onboarding_url);
    },
    onError: (error: any) => {
      toast.error(error.message ?? "Something went wrong");
    },
  });

  return (
    <Button onClick={() => mutate()} disabled={isLoading}>
      {isLoading ? (
        <Loader2Icon className="animate-spin w-4 h-4" />
      ) : (
        "Connect Stripe"
      )}
    </Button>
  );
}

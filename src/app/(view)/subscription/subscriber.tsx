"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubscriptionDetailsType } from "./page";
import { buyPlanApi, createPaymentIntentApi } from "@/lib/api/core/core";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AnyType } from "@/lib/config/error-type";
import { Loader2Icon } from "lucide-react";
import { encrypt } from "@/lib/formatter";

export default function Subscriber({
  x,
  i,
}: {
  x: SubscriptionDetailsType;
  i: number;
}) {
  const router = useRouter();
  const [cookies] = useCookies(["ghost"]);
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["subscription"],
    mutationFn: (data: {
      payment_method_types: "card";
      amount: string | number;
    }) => {
      return createPaymentIntentApi(data, cookies.ghost);
    },
  });

  const { mutate: payer } = useMutation({
    mutationKey: ["subscription"],
    mutationFn: (data: {
      payment_intent_id?: string | undefined;
      subscription_id: string;
    }) => {
      return buyPlanApi(data, cookies.ghost);
    },
  });

  const freePlan = async () => {
    setLoading(true);
    payer(
      { subscription_id: "1" },
      {
        onError: (err) => {
          toast.error(err?.message ?? "Failed to create Payment intent");
          setLoading(false);
        },
        onSuccess: (data: AnyType) => {
          console.log(data);
          if (data.message.includes("You current plan.")) {
            toast.error("You already have an active plan");
          }
          setLoading(false);
        },
      }
    );
  };

  const managePlan = (x: number, price: string | number) => {
    setLoading(true);
    mutate(
      { payment_method_types: "card", amount: x },
      {
        onError: (err) => {
          if (
            err.message.includes(
              "Cannot read properties of undefined (reading 'client_secret')"
            )
          ) {
            toast.error("You already have an active plan");
          } else {
            toast.error(err?.message ?? "Failed to create Payment intent");
          }
          setLoading(false);
        },
        onSuccess: (data: AnyType) => {
          router.push(
            `/subscription/payment?xxx=${encrypt(
              data.data.client_secret
            )}&r=${price}&kilo=${String(x)}&codex=${data.data.id}`
          );
          setLoading(false);
        },
      }
    );
  };

  return (
    <Button
      className="w-full rounded-full border-0"
      variant={"outline"}
      disabled={loading}
      onClick={() => {
        if (i === 0) {
          freePlan();
        } else {
          managePlan(i + 1, x.cost);
        }
      }}
    >
      {loading ? <Loader2Icon className="animate-spin" /> : x.button}
    </Button>
  );
}

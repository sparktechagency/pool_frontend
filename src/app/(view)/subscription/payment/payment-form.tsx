"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import howl from "@/lib/howl";
import { toast } from "sonner";
import { AnyType } from "@/lib/config/error-type";

export default function PaymentForm({
  id,
  price,
  paymentId,
}: {
  id: string;
  price: string;
  paymentId: string;
}) {
  const [cookies] = useCookies(["ghost"]);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/success", // optional
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      try {
        const data = {
          subscription_id: id,
          payment_intent_id: paymentId, // ✅ real payment intent ID
        };

        const result: AnyType = await howl({
          link: "/provider/buy-plan-success",
          token: cookies.ghost,
          method: "post",
          data,
        });

        if (!result.status) {
          toast.error(result.message ?? "Payment failed");
        } else {
          toast.success(result.message ?? "Payment success");
          window.location.href = "/subscription/payment/success";
        }
      } catch {
        toast.error("Payment successful but couldn't log it.");
      }
    } else {
      toast.error(
        `Payment failed: ${paymentIntent?.status ?? "Unknown status"}`
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PaymentElement className="border-2 rounded-md border-slate-600 shadow-none! pb-0.5" />
      <Button
        className="w-full mt-6"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          <>Pay ${parseInt(price).toFixed(2)}</>
        )}
      </Button>
    </form>
  );
}

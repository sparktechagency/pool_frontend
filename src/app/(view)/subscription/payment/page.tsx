"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment-form";
import { useRouter, useSearchParams } from "next/navigation";
import { decrypt } from "@/lib/formatter";
// import { decrypt } from "@/lib/formatter";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_SPTRIPE_KEY!);

export default function Page() {
  const navig = useRouter();
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("xxx");
  const price = searchParams.get("r");
  const kilo = searchParams.get("kilo");
  const codex = searchParams.get("codex");
  const clientSecret = decrypt(encryptedId as string);
  if (!price || !codex || !kilo) {
    return navig.back();
  }
  return (
    <main className="w-1/2 mx-auto my-12 min-h-[80dvh] flex justify-center items-center">
      <section className="bg-secondary p-6 w-full rounded-lg space-y-6">
        <h1 className="text-4xl font-semibold">Complete Payment</h1>
        <p className="text-muted-foreground">
          Secure payment processed through our encrypted gateway
        </p>
        <p className="text-lg font-semibold">Select Payment Method</p>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: { colorPrimary: "#003B73" },
            },
          }}
        >
          <PaymentForm id={kilo} price={price} paymentId={codex} />{" "}
        </Elements>
      </section>
    </main>
  );
}

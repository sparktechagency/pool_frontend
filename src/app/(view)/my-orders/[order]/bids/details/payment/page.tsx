"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./payment-form";
import { useRouter, useSearchParams } from "next/navigation";
import { decrypt } from "@/lib/formatter";
// import { decrypt } from "@/lib/formatter";

const stripePromise = loadStripe(
  "pk_test_51R5Sq0FGWJUVo7kIX2G4T8H280xmqBIS2nehzSwNoze3xD5BG65vbSHXn5cQRXsKBGawvsTupOjcjdFlNAyVfrUx002p9ic2SB"
);

export default function Page() {
  const navig = useRouter();
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("xxx");
  const price = searchParams.get("r");
  const codex = searchParams.get("codex");
  const clientSecret = decrypt(encryptedId as string);
  if (!price || !codex) {
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
          <PaymentForm price={price as string} paymentId={codex as string} />{" "}
        </Elements>
      </section>
    </main>
  );
}

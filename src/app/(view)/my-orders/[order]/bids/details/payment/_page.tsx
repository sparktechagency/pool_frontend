"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page() {
  const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: "payment", amount: 50, currency: "usd" }}
    >
      <main className="my-12!">
        <section className="w-4/5 mx-auto! space-y-6!">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Complete Payment</CardTitle>
              <CardDescription>
                Secure payment processed through our encrypted gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <PaymentElement />
                <span className="flex flex-row justify-start items-center gap-4 mt-6!">
                  <Checkbox />
                  <Label>
                    I authorize this payment and agree to the Terms of Service
                    and Privacy Policy.
                  </Label>
                </span>
              </form>
              <Button
                className="mt-6! w-full bg-accent-foreground hover:bg-accent-foreground/80"
                asChild
              >
                <Link href="payment/success">Pay</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </Elements>
  );
}

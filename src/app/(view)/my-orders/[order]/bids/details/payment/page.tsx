"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrushCleaningIcon, CalendarClockIcon } from "lucide-react";
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
          <Card className="w-full">
            <CardHeader className="border-b">
              <CardTitle className="text-3xl mb-6!">Order Summary</CardTitle>
              <div className="flex flex-row justify-start items-start gap-6">
                <div className="rounded-lg bg-accent-foreground p-4! text-background">
                  <BrushCleaningIcon className="size-8" />
                </div>
                <div className="space-y-2!">
                  <h3 className="text-xl font-semibold">
                    Premium Home Cleaning
                  </h3>
                  <p className="font-light">By: CleanPro Team</p>
                  <p className="flex items-center gap-1 font-light">
                    <CalendarClockIcon className="size-5" />
                    June 20, 2023 at 2:00 PM
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3!">
              <div className="flex flex-row justify-between items-center">
                <p>Service Fee</p>
                <p>$75.00</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p>Service Tax</p>
                <p>$5.25</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p>Platform Fee</p>
                <p>$8.75</p>
              </div>
              <Separator />
              <div className="flex flex-row justify-between items-center text-xl font-semibold text-accent-foreground">
                <p>Total Amount</p>
                <p>$89.00</p>
              </div>
            </CardContent>
          </Card>
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

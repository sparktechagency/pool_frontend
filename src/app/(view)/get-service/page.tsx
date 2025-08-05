import Bread from "@/components/core/bread";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import QuoteForm from "./quote-form";

export default function Page() {
  return (
    <>
      <Bread />
      <main className="px-8! !py-12">
        <section className="lg:w-2/3 mx-auto! space-y-6!">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                Get Reliable Pool Services
              </CardTitle>
              <CardDescription className="mt-6!">
                Fill out the quick form below to receive multiple quotes from
                trusted providers in your area.
              </CardDescription>
            </CardHeader>
          </Card>
          <QuoteForm />
        </section>
      </main>
    </>
  );
}

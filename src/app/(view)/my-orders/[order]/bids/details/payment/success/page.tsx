import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="my-24!">
      <section className="h-[50dvh] w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold">Successful!</h1>
        <p>Your payment complete successfully.</p>
      </section>
      <section className="w-1/2 mx-auto!">
        <h1 className="text-3xl font-semibold text-center mb-12!">
          Review & rating
        </h1>
        <div className="w-full flex flex-row justify-around items-center">
          <Button variant="secondary">
            <StarIcon /> 1
          </Button>
          <Button variant="secondary">
            <StarIcon /> 2
          </Button>
          <Button variant="secondary">
            <StarIcon /> 3
          </Button>
          <Button variant="secondary">
            <StarIcon /> 4
          </Button>
          <Button variant="secondary">
            <StarIcon /> 5
          </Button>
        </div>
        <div className="space-y-6! mt-12!">
          <h4 className="text-3xl font-semibold">Any compliment?</h4>
          <Textarea
            placeholder="Extra sentence for the service providers...."
            className="h-[140px]"
          />
          <Button className="w-full" asChild>
            <Link href="/">Submit</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

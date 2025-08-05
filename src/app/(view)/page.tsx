import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Features from "./_home/features";
import MadeSimple from "./_home/made-simple";
import Testimonials from "./_home/testimonials";
import NearYou from "./_home/near-you";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import ButtonCheck from "./_home/button-check";
export default function Home() {
  return (
    <main className="mb-8! px-2! lg:px-8!">
      <section
        className="h-[calc(100dvh-148px)] rounded-xl w-full bg-center bg-cover relative mb-20!"
        style={{ backgroundImage: "url('/image/header-bg.jpg')" }}
      >
        <div className="h-full w-full absolute top-0 left-0 bg-gradient-to-br from-zinc-950/60 rounded-xl pt-4! lg:pt-[7%]! px-4! lg:px-12! text-background space-y-8!">
          <h1 className="text-4xl xl:text-6xl">Pool Service Made Simple</h1>
          <p className="text-xl">
            Compare quotes from trusted pros for cleaning, repairs, or new pool
            builds.
          </p>
          <Suspense fallback={""}>
            <ButtonCheck />
          </Suspense>
        </div>
      </section>
      <section className="mb-24!">
        <h2 className="text-center text-xl lg:text-3xl mb-12!">How It Works</h2>
        <div className="w-full grid lg:grid-cols-3 gap-6">
          {[
            {
              title: "Submit Request",
              img: "/image/aa.jpg",
              desc: "Tell us what you need with our simple form",
            },
            {
              title: "Get & Compare Quotes",
              img: "/image/bb.jpg",
              desc: "Receive multiple quotes from verified pros",
            },
            {
              title: "Book + Pay Securely",
              img: "/image/cc.jpg",
              desc: "Schedule and pay with confidence",
            },
          ].map((x, i) => (
            <Card key={i}>
              <CardHeader>
                <Image
                  src={x.img}
                  height={600}
                  width={600}
                  className="w-full rounded-lg aspect-[5/4] object-cover object-center"
                  alt="thumbnail"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center text-3xl text-blue-900 font-medium pb-6!">
                  {x.title}
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  {x.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Features />
      <MadeSimple />
      <Testimonials />
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <NearYou />
      </Suspense>
    </main>
  );
}

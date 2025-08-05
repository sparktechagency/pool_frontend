import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookOpenTextIcon, Loader2, MessageSquareHeart } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <main className="mb-[100px]!">
      <Card className="w-fit mx-auto! px-12! my-12!">
        <CardContent className="space-y-6! flex flex-col justify-between items-center">
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <Image
              src="/icon/thank.gif"
              height={200}
              width={200}
              className="size-24!"
              loading="lazy"
              alt="thank_you"
            />
          </Suspense>
          <h1 className="text-4xl text-center">Thank You!</h1>
          <p className="text-center">We Have Recieved your message! </p>
        </CardContent>
      </Card>
      <section className="grid grid-cols-5 gap-6 w-4/5 mx-auto! my-12!">
        <Card className="bg-[#33628F] rounded-lg flex flex-col justify-between items-start text-background!">
          <CardHeader>
            <MessageSquareHeart />
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl text-center ">
              We can&apos;t wait to to you !{" "}
            </h3>
          </CardContent>
          <CardFooter>
            <CardDescription className="text-background! text-center">
              Please allow 12-14 hrs before you can expect to recieve a respose
              from us
            </CardDescription>
          </CardFooter>
        </Card>
        <Image
          src="/image/4e715d20e2d1e1d0581a8ea5248dc8c918ce46db.jpg"
          height={1024}
          width={768}
          className="col-span-2 w-full object-center object-cover rounded-lg"
          alt="image"
        />
        <Image
          src="/image/4e715d20e2d1e1d0581a8ea5248dc8c918ce46db.jpg"
          height={1024}
          width={768}
          className="col-span-2 w-full object-center object-cover rounded-lg"
          alt="image"
        />
      </section>
      <section className="grid grid-cols-5 gap-6 w-4/5 mx-auto! my-12!">
        <Image
          src="/image/4e715d20e2d1e1d0581a8ea5248dc8c918ce46db.jpg"
          height={1024}
          width={768}
          className="col-span-2 w-full object-center object-cover rounded-lg"
          alt="image"
        />
        <Image
          src="/image/4e715d20e2d1e1d0581a8ea5248dc8c918ce46db.jpg"
          height={1024}
          width={768}
          className="col-span-2 w-full object-center object-cover rounded-lg"
          alt="image"
        />
        <Card className="bg-accent-foreground rounded-lg flex flex-col justify-between items-start text-background!">
          <CardHeader>
            <BookOpenTextIcon />
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl text-center ">Want to browse some more?</h3>
          </CardContent>
          <CardFooter>
            <CardDescription className="text-background! text-center">
              Make sure to check out our latest blog post to keep up to date!
            </CardDescription>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

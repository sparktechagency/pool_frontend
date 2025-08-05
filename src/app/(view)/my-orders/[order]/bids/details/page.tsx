import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  MailIcon,
  MapPin,
  PackageMinusIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main>
      <section className="w-10/11 mx-auto! my-12! grid grid-cols-3 gap-6">
        <div className="flex flex-col justify-start items-center gap-4">
          <Avatar className="size-34">
            <AvatarImage src={`https://avatar.iran.liara.run/public`} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <h3 className="text-2xl text-center font-semibold">CleanPro Pools</h3>
          <p className="flex gap-1 items-center text-accent-foreground">
            <MailIcon className="size-5" />
            info@poolvalet.com{" "}
          </p>
          <p className="flex gap-1 items-center text-accent-foreground">
            <MapPin className="size-5" />
            8494 Signal Hill Road Manassas, Va
          </p>
        </div>
        <div className="space-y-6!">
          <Card>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="">
                <h3 className="text-muted-foreground">Service Type</h3>
                <p className="font-semibold">Pool Maintainance</p>
              </div>
              <div className="">
                <h3 className="text-muted-foreground">Experience</h3>
                <p className="font-semibold">8 years</p>
              </div>
              <div className="">
                <h3 className="text-muted-foreground">Response Time</h3>
                <p className="font-semibold">Within 2 hours</p>
              </div>
              <div className="">
                <h3 className="text-muted-foreground">Service Rating </h3>
                <p className="flex items-center gap-1 font-semibold">
                  <StarIcon fill="#FFD700" stroke="" className="size-5" /> 4.8
                </p>
              </div>
              <div className="">
                <h3 className="text-muted-foreground">Order Completed</h3>
                <p className="font-semibold flex items-center gap-1">
                  <CheckCircle2 fill="#2DC845" stroke="#ffffff" /> 2342
                </p>
              </div>
              <div className="">
                <h3 className="text-muted-foreground">Canceled Orders</h3>
                <p className="font-semibold flex items-center gap-1">
                  <PackageMinusIcon fill="#F34848" stroke="#333333" />
                  123
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quote Outline</CardTitle>
              <CardDescription>
                I also offer this service and can take you to a fantastic pool
                where you can have a great time.
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="w-full flex flex-row justify-between items-center">
            <Button variant="outline" className="rounded-full" size="lg">
              <MailIcon /> Chat with CleanPro Pools
            </Button>
            <Button
              className="bg-accent-foreground hover:bg-accent-foreground/80 rounded-full"
              size="lg"
              asChild
            >
              <Link href="details/payment">Pay $432.00</Link>
            </Button>
          </div>
        </div>
        <div className="space-y-6!">
          <h3 className="text-xl font-semibold">What home owners say?</h3>
          <div className="h-[400px] w-full border rounded-lg overflow-y-scroll">
            {Array.from({ length: 4 }).map((_, ll) => (
              <Card className="border-0! shadow-none!" key={ll}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarImage
                          src={`https://avatar.iran.liara.run/public/${ll}`}
                        />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <h3 className="">L. Messi</h3>
                    </div>
                    <p className="flex items-center text-sm">
                      <StarIcon
                        fill="#FFD700"
                        stroke=""
                        className="size-5 mr-1!"
                      />
                      3.8
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    From the first call to the final result, everything was
                    smooth and stress-free. The team was knowledgeable, neat &
                    clean respectful of my space. Truly impressed and highly
                    recommend!
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

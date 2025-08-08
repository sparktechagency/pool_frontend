import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfileApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function NearYou() {
  const token = (await cookies()).get("ghost")?.value;
  if (!token) {
    return <></>;
  }
  const call: AnyType = await getProfileApi(token);
  if (call?.data?.role === "USER") {
    return <></>;
  }

  return (
    <section>
      <h1 className="text-xl lg:text-3xl text-center font-semibold mt-12">
        Quotes Request Near you
      </h1>
      <div className="w-full mt-12! grid lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col lg:flex-row gap-4">
              <Image
                src="/image/avatar.jpg"
                height={600}
                width={250}
                className="h-48 w-34 rounded-lg object-cover"
                alt="thumbnail"
              />
              <div className="flex-1">
                <h3 className="text-xl">L. Messi</h3>
                <p className="text-green-500 text-xl font-semibold mb-6! lg:mb-0!">
                  $865.75
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
                  quisquam reiciendis dolorum, blanditiis unde quasi assumenda
                  doloribus corrupti eveniet vel reprehenderit? Alias blanditiis
                  sint ab quidem velit expedita ducimus eius!
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Button size="lg" className="mt-12! mx-auto!" asChild>
          <Link href="/browse">See All</Link>
        </Button>
      </div>
    </section>
  );
}

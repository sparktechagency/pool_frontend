import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import ResetForm from "./reset-form";

export default function Page() {
  return (
    <div className="!p-12 h-[calc(100dvh-64px)] flex justify-center items-center">
      <Card className="w-1/2 !mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Create a New Password
          </CardTitle>
          <CardDescription className="text-lg font-semibold">
            Choose a strong password that you can remember easily.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="">
            <ResetForm />
          </div>
          <div className="w-full h-full">
            {/* <Image src="" height={} width={} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import OtpForm from "./forgot-form";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-1/2 !mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verification code
          </CardTitle>
          <CardDescription className="text-center">
            We sent a reset link to contact@dscode.com enter 6 digit code that
            is mentioned in the email
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="">
            <OtpForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ForgotForm from "./forgot-form";

export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-center !pt-12 text-4xl font-bold">Forget Password</h1>
      <p className="text-center text-muted-foreground !pt-4 !pb-12">
        Enter valid information to update a new password
      </p>
      <Card className="w-1/2 !mx-auto">
        <CardContent className="grid gap-6 !py-12">
          <div className="">
            <ForgotForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

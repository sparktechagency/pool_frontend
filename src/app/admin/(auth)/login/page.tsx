import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import LoginForm from "./login-form";

export default async function Page() {


  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-1/2 !mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Log in</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

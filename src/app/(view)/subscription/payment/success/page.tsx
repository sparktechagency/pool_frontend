import { CheckCircleIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BackToBidPage from "./backto";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-4">
          <CheckCircleIcon className="h-16 w-16 text-primary" />
          <CardTitle className="text-3xl font-bold">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Thank you for your purchase! A confirmation email with your order
            details has been sent to your inbox.
          </p>
          <div className="flex flex-col gap-2">
            <BackToBidPage />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

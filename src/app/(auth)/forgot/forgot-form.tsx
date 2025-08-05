"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { encrypt } from "@/lib/formatter";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { forgotApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";

// Zod Schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function AuthForms() {
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["profile"],
    mutationFn: (data: AnyType) => {
      return forgotApi(data);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted:", values);
    try {
      mutate(values, {
        onError: (x) => {
          console.log(x);
        },
        onSuccess: (x) => {
          console.log(x);
          navig.push(`/otp?xxx=${encrypt(values.email, 1)}`);
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Forget Password
          </h1>
          <p className="text-center mb-6 text-sm text-muted-foreground">
            Enter the email address or mobile phone number <br /> associated
            with your Poolvalet account.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      htmlFor="signin-email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <FormControl>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        className="w-full px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-accent-foreground text-white font-medium py-3 px-4 rounded-md"
              >
                SEND CODE <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Already have account?{" "}
                  <Link
                    href="/auth"
                    className="text-accent-foreground hover:underline"
                  >
                    Sign in
                  </Link>
                </p>

                <Separator />

                <p className="text-sm text-muted-foreground">
                  You may contact{" "}
                  <Link
                    href="/help"
                    className="text-accent-foreground hover:underline"
                  >
                    Customer Service
                  </Link>{" "}
                  for help restoring access to your account.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

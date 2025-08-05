"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

const formSchema = z.object({
  email: z.string(),
});

export default function OtpForm() {
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navig.push("/admin/reset-pass");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4 justify-center items-center">
                <FormLabel className="text-lg font-bold">E-mail</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} className="flex gap-2" {...field}>
                    <InputOTPSlot
                      index={0}
                      className="border border-muted-foreground/40 rounded-md w-10 h-10 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <InputOTPSlot
                      index={1}
                      className="border border-muted-foreground/40 rounded-md w-10 h-10 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <InputOTPSlot
                      index={2}
                      className="border border-muted-foreground/40 rounded-md w-10 h-10 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <InputOTPSlot
                      index={3}
                      className="border border-muted-foreground/40 rounded-md w-10 h-10 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <InputOTPSlot
                      index={4}
                      className="border border-muted-foreground/40 rounded-md w-10 h-10 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <InputOTPSlot
                      index={5}
                      className="border border-muted-foreground/40 rounded-md w-10 h-10 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Verify Code
          </Button>
          <div></div>
        </form>
      </Form>
    </div>
  );
}

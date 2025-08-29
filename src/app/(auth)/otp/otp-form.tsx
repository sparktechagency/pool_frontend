"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import howl from "@/lib/howl";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";
import { useRouter } from "next/navigation";

const verificationSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 characters"),
});

export default function AuthForms() {
  const [, setCookie] = useCookies(["ghost"]);
  const navig = useRouter();
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof verificationSchema>) => {
    try {
      const call: AnyType = await howl({
        link: "/verify-otp",
        method: "post",
        data: { otp: data.code },
      });
      if (!call.status) {
        toast.error(call.message);
      } else {
        setCookie("ghost", call.access_token);
        navig.push("/");
      }
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
            Verify Your Email Address
          </h1>
          <p className="text-center mb-6 text-sm text-muted-foreground">
            Duis sagittis molestie tellus, at eleifend sapien pellentesque quis.
            Fusce lorem nunc, fringilla sit amet nunc.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-1">
                      <FormLabel>Verification Code</FormLabel>
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm font-medium"
                      >
                        Resend code
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter verification code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full py-3">
                VERIFY CODE
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { updatePassApi } from "@/lib/api/auth/auth";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    password: z.string().min(8, "New password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export default function ChangePasswordForm() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const [cookies] = useCookies(["ghost"]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["profile"],
    mutationFn: (data: AnyType) => updatePassApi(data, cookies.ghost),
  });

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    mutate(values, {
      onSuccess: (data: AnyType) => {
        toast.success(data.message ?? "Successfully Changed Password");
        form.reset();
      },
      onError: (data) => {
        toast.error(data.message ?? "Failed to update Password!");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <h2 className="text-2xl font-semibold">Change Password</h2>

        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" className="bg-background" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" className="bg-background" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" className="bg-background" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-accent-foreground"
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  );
}

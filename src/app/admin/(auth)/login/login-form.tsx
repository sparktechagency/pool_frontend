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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const { mutate: login, isPending } = useMutation({ mutationFn: loginApi });
  const [, setCookie] = useCookies(["ghost"]);
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    login(data, {
      onSuccess: (res: AnyType) => {
        console.log(res);

        if (res.token) {
          toast.success(res.message ?? "Login Success");
          try {
            setCookie("ghost", res.token);
            navig.push("/admin/dashboard");
          } catch (error) {
            console.error(error);
            toast.error("Failed to set Cookie");
          }
        } else {
          toast.error("Login Failed 202");
        }
      },
      onError: () => {
        toast.error("Login failed");
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                    className="bg-secondary"
                  />
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
                <FormLabel className="text-lg font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Abc123..."
                    {...field}
                    className="bg-secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/admin/forgot-pass"}
            className="text-pretty text-primary font-bold hover:underline"
          >
            Forget your password?
          </Link>
          <div className="flex items-center gap-2 !mt-12">
            <Checkbox /> <Label>Remember me?</Label>
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <Loader2Icon className="animate-spin" /> : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

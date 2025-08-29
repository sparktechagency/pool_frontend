"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/auth/auth";
import { toast } from "sonner";
import { AnyType } from "@/lib/config/error-type";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Image from "next/image";

// Schema
const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useMutation({ mutationFn: loginApi });
  const [, setCookie] = useCookies(["ghost"]);

  const navig = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    login(data, {
      onSuccess: (res: AnyType) => {
        // console.log(res);

        if (res.token) {
          toast.success(res.message ?? "Login Success");
          try {
            setCookie("ghost", res.token);
            navig.push("/");
          } catch (error) {
            console.error(error);
            toast.error("Failed to set Cookie");
          }
        } else {
          toast.error(res.message.password ?? "Invalid login attempt");
        }
      },
      onError: (error: AnyType) => {
        toast.error(error.data.message ?? "Login failed");
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="!space-y-2">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="w-full !px-3 !py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...field}
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
              <FormItem className="!space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <Button
                    className="text-sm text-accent-foreground hover:text-accent-foreground/80 font-medium"
                    variant="link"
                    asChild
                  >
                    <Link href={"/forgot"}>Forget Password?</Link>
                  </Button>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="w-full !px-3 !py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={20} />
                      ) : (
                        <EyeIcon size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-accent-foreground text-white font-medium !py-3 px-4 rounded-md transition-colors"
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                SIGN IN <ArrowRight />
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="!px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
        </form>
      </Form>

      <div className="!space-y-3 mt-6">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-3 !py-3 !px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => signIn("google")}
        >
          <Image
            src={"/icon/google.svg"}
            height={48}
            width={48}
            alt="google_icon"
            className="size-4"
          />
          Login with Google
        </Button>
      </div>
    </>
  );
}

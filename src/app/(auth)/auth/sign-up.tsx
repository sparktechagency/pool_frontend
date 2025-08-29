/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import howl from "@/lib/howl";
import { useRouter } from "next/navigation";
import { encrypt } from "@/lib/formatter";
import Image from "next/image";
import { signIn } from "next-auth/react";
const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    agreedToTerms: z.boolean().refine((v) => v, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp({ as }: { as: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navig = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  const onSubmit = async (dataset: z.infer<typeof signUpSchema>) => {
    try {
      const data = {
        role: as === "user" ? 1 : 2,
        full_name: dataset.name,
        email: dataset.email,
        password: dataset.password,
        password_confirmation: dataset.confirmPassword,
      };
      const call: any = await howl({ link: "/register", method: "post", data });
      // console.log(call);

      if (!call.status) {
        toast.error(call.message ?? "Failed to Log in");
      } else {
        toast.success(call.message ?? "Successfully Logged in");
        navig.push(`/otp?xxx=${encrypt(dataset.email)}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="!space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
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
              <FormLabel className="text-sm font-medium text-gray-700">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="8+ characters"
                    className="w-full !px-3 !py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="!space-y-2">
              <FormLabel className="text-sm font-medium text-gray-700">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full !px-3 !py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreedToTerms"
          render={({ field }) => (
            <FormItem className="flex items-start !space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <FormLabel className="text-sm text-gray-600 leading-relaxed">
                <p className="w-full">
                  Are you agree to Clicon{" "}
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Terms of Condition
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Privacy Policy
                  </span>
                  .
                </p>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.watch("agreedToTerms")}
          className="w-full bg-accent-foreground disabled:bg-gray-400 text-white font-medium !py-3 !px-4 rounded-md transition-colors"
        >
          SIGN UP <ArrowRight />
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="!px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <div className="!space-y-3">
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
            Sign up with Google
          </Button>
        </div>
      </form>
    </Form>
  );
}

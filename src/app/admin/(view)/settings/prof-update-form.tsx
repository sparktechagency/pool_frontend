"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { updateAdminProfile } from "@/lib/api/admin/admin";
import { getProfileApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  contact_number: z.string().min(1, "Contact is required"),
  location: z.string().min(1, "Location is required"),
});

export default function ProfUpdateForm() {
  const [cookies] = useCookies(["ghost"]);
  const { data, isPending }: AnyType = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(cookies.ghost),
  });
  const { mutate } = useMutation({
    mutationKey: ["profile"],
    mutationFn: (data: AnyType) => {
      return updateAdminProfile(cookies.ghost, data);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      contact_number: "",
      location: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("full_name", data.data.full_name || "");
      form.setValue("contact_number", data.data.contact_number || "");
      form.setValue("location", data.data.location || "");
    }
  }, [data]);

  function submitter(values: z.infer<typeof formSchema>) {
    const payload = { ...values, _method: "PATCH" };
    console.log(payload);
    mutate(payload, {
      onError: (err: AnyType) => {
        toast.error(
          err.message ?? err.data.message ?? "Failed to update profile"
        );
      },
      onSuccess: (data: AnyType) => {
        toast.success(data.message ?? "Successfully updated Admin profile");
      },
    });
  }

  if (isPending) {
    return (
      <Card className="!mt-12 w-2/3 !mx-auto rounded-lg border-2 !p-6">
        <CardContent className="space-y-6">
          <Skeleton className="w-full h-10" />
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
          <Skeleton className="w-full h-10" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="!mt-12 w-2/3 !mx-auto rounded-lg border-2 !p-6">
      <Form {...form}>
        <form
          className="!space-y-6 grid grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(submitter)}
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="0147852369" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Dhaka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full !mt-6 col-span-2">Update Profile</Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editAddressApi,
  EditAddressPayload,
  getProfileApi,
} from "@/lib/api/auth/auth";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";
import { toast } from "sonner";

// Zod Schema
const addressSchema = z.object({
  display_name: z.string().min(1, "Display Name is required"),
  user_name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  phone_number: z.string().min(1, "Phone Number is required"),
  country: z.string().min(1, "Country/Region is required"),
  state: z.string().min(1, "State is required"),
  zip_code: z.string().min(1, "Zip Code is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function Page() {
  const [cookies] = useCookies(["ghost"]);
  const token = cookies.ghost;
  const { data }: AnyType = useQuery({
    queryKey: ["profile", token],
    queryFn: ({ queryKey }) => {
      const [, token] = queryKey;
      return getProfileApi(token);
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["profile"],
    mutationFn: async ({ data }: { data: EditAddressPayload }) => {
      return await editAddressApi(data, cookies.ghost);
    },
  });

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      display_name: "",
      user_name: "",
      email: "",
      phone_number: "",
      country: "",
      state: "",
      zip_code: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        display_name: data.data.full_name || "",
        user_name: data.data.full_name || "", // Adjust if there's a separate username
        email: data.data.email || "",
        phone_number: data.data.contact_number || "",
        country: data.data.location || "",
        state: "",
        zip_code: "",
      });
    }
  }, [data, form]);

  const onSubmit = (data: AddressFormValues) => {
    mutate(
      { data: { ...data, _method: "PATCH" } },
      {
        onError: (data) => {
          toast.error(data.message ?? "Failed to updated Address data");
        },
        onSuccess: (data: AnyType) => {
          toast.success(data.message ?? "Successfully updated Address data");
        },
      }
    );
  };

  return (
    <main className="my-12 px-8">
      <Card className="w-2/3 mx-auto mt-12 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-3xl">Address</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-6"
            >
              <FormField
                control={form.control}
                name="display_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country/Region</FormLabel>
                    <FormControl>
                      <Input className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

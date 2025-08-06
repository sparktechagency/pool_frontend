"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditBidApi } from "@/lib/api/core/core";
import { AnyType } from "@/lib/config/error-type";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const bidSchema = z.object({
  price: z.string().min(1, "Price is required"),
  outline: z.string().min(1, "Outline is required"),
});

export default function EditForm({
  id,
  data,
  closeDialog, // <- Prop to close the dialog
}: {
  id: string | number;
  data: AnyType;
  closeDialog: () => void; // <- Function type
}) {
  const [cookies] = useCookies(["ghost"]);
  const queryClient = useQueryClient();
  console.log(data.data.price_offered);

  const form = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      price: "",
      outline: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["bid"],
    mutationFn: ({ data }: { data: AnyType }) => {
      return EditBidApi(id, data, cookies.ghost);
    },
  });

  useEffect(() => {
    form.setValue("price", data.data.price_offered);
    form.setValue("outline", data.data.quote_outline);
  }, [data.data.price_offered, data.data.quote_outline, form]);

  const onSubmit = async (data: z.infer<typeof bidSchema>) => {
    console.log("Bid Submitted:", data);

    try {
      const finalizer = {
        quote_id: id,
        price_offered: data.price,
        quote_outline: data.outline,
        _method: "PUT",
      };

      mutate(
        { data: finalizer },
        {
          onError: (err) => {
            toast.error(err.message ?? "Bid Edit Failed");
          },
          onSuccess: (data: AnyType) => {
            if (!data.status) {
              toast.error(data.message ?? "Bid Edit Failed");
            } else {
              toast.success(data.message ?? "Bid Edit successful");

              // ✅ Invalidate and refetch
              queryClient.invalidateQueries({
                queryKey: ["order", "myBid"],
              });

              // ✅ Close dialog
              closeDialog();
            }
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit your bid price</FormLabel>
              <FormControl>
                <Input placeholder="Enter Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote Outline</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your bid..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full rounded-full">
          Confirm change
        </Button>
      </form>
    </Form>
  );
}

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
import { useMutation } from "@tanstack/react-query";
import { ApplyBidApi } from "@/lib/api/core/core";
import { AnyType } from "@/lib/config/error-type";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
const bidSchema = z.object({
  price: z.string().min(1, "Price is required"),
  outline: z.string().min(1, "Outline is required"),
});

export default function BidForm({
  id,
  point,
}: {
  id: string | number;
  point: string | number;
}) {
  const [cookies] = useCookies(["ghost"]);
  const navig = useRouter();
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
      return ApplyBidApi(id, data, cookies.ghost);
    },
  });

  const onSubmit = async (data: z.infer<typeof bidSchema>) => {
    console.log("Bid Submitted:", data);

    try {
      const finalizer = {
        quote_id: id,
        price_offered: data.price,
        quote_outline: data.outline,
      };

      mutate(
        { data: finalizer },
        {
          onError: (err) => {
            toast.error(err.message ?? "Bid Failed");
          },
          onSuccess: (data: AnyType) => {
            if (!data.status) {
              toast.error(data.message ?? "Bid Failed");
            } else {
              toast.success(data.message ?? "Bid successfull");
              navig.push(window.location.href + "/bids");
            }
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  if (!point || String(point) === "0") {
    return (
      <div>
        <Button
          className="w-full"
          onClick={() => {
            localStorage.setItem("bid_page", window.location.href);
            navig.push("/subscription");
          }}
        >
          Buy Subscription
        </Button>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add your bid price</FormLabel>
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
          Add
        </Button>
      </form>
    </Form>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSubscriptionApi, updateSubscription } from "@/lib/api/admin/admin";
import { AnyType } from "@/lib/config/error-type";
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [cookies] = useCookies(["ghost"]);

  const { data, isLoading, refetch }: AnyType = useQuery({
    queryKey: ["subsc"],
    queryFn: () => getSubscriptionApi(cookies.ghost),
    enabled: !!cookies.ghost,
  });

  const [selectedTab, setSelectedTab] = useState<string>("1");
  const [quotesInput, setQuotesInput] = useState<number | "">("");
  const [quotePrice, setQuotePrice] = useState<number>(0);

  const mutation: AnyType = useMutation({
    mutationFn: (newQuotes) => {
      if (!data) return Promise.reject("No data");
      const subscriptionId = data.subscriptions[parseInt(selectedTab) - 1].id;
      return updateSubscription(subscriptionId, cookies.ghost, newQuotes);
    },
    onError: (err: AnyType) => {
      toast.error(
        err.message ??
          err.data.message ??
          "Failed to update subscription ammount"
      );
      console.log(err);
    },
    onSuccess: (data: AnyType) => {
      refetch();
      toast.success(data.message ?? "Subscription amount successfully updated");
    },
  });

  useEffect(() => {
    if (data) {
      const currentQuotes =
        data.subscriptions[parseInt(selectedTab) - 1]?.number_of_quotes || 0;
      setQuotesInput(currentQuotes);
      const pricing = data.subscriptions[parseInt(selectedTab) - 1]?.price || 0;
      setQuotePrice(pricing);
    }
  }, [data, selectedTab]);

  if (isLoading) return <p>Loading subscriptions...</p>;
  const handleUpdate = () => {
    const currentSub = data.subscriptions[parseInt(selectedTab) - 1];

    if (
      quotesInput === currentSub.number_of_quotes &&
      quotePrice === currentSub.price
    ) {
      toast.info("No changes detected");
      return; // don't send mutation
    }

    mutation.mutate({
      number_of_quotes: quotesInput,
      price: quotePrice,
      _method: "PUT",
    });
  };

  return (
    <div className="!pb-6 space-y-3">
      <h3 className="text-3xl font-semibold">Manage Subscription</h3>
      <p className="text-sm text-muted-foreground font-medium">
        Activities summary at a glance
      </p>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-inherit">
          {data?.subscriptions.map((sub: AnyType, index: number) => (
            <TabsTrigger key={sub.id} value={(index + 1).toString()}>
              {sub.plan_name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Separator />
      <Label>Amount of quotes:</Label>
      <Input
        type="number"
        placeholder="Number of quotes provider get"
        value={quotesInput}
        onChange={(e) => setQuotesInput(Number(e.target.value))}
      />
      <Label>Price:</Label>
      <Input
        type="number"
        step="0.01" // allows decimal input
        placeholder="Price"
        disabled={selectedTab === "1"}
        value={quotePrice}
        onChange={(e) =>
          setQuotePrice(e.target.value === "" ? 0 : parseFloat(e.target.value))
        }
      />

      <div className="flex justify-center items-center mt-12">
        <Button size="lg" onClick={handleUpdate} disabled={mutation.isLoading}>
          {mutation.isLoading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
}

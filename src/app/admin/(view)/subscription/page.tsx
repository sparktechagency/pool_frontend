import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
export default function Page() {
  return (
    <>
      <div className="!pb-6 space-y-3!">
        <h3 className="text-3xl font-semibold">Manage Subscription</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Activities summary at a glance{" "}
        </p>
        <Tabs defaultValue="1">
          <TabsList className="bg-inherit">
            <TabsTrigger value={"1"}>Free plan</TabsTrigger>
            <TabsTrigger value={"2"}>Basic plan</TabsTrigger>
            <TabsTrigger value={"3"}>Standard plan</TabsTrigger>
            <TabsTrigger value={"4"}>Premium plan</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          className=""
          placeholder="Number of quotes provider get"
          type="number"
        />
        <div className="flex justify-center items-center mt-12!">
          <Button size="lg">Update</Button>
        </div>
      </div>
      <h3 className="text-3xl font-semibold mb-12!">Number of Quotes</h3>
      <p>2</p>
    </>
  );
}

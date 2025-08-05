import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { z } from "zod";

export default function BidForm() {
  const bidSchema = z.object({
    price: z.string(),
    outline: z.string(),
  });
  return (
    <div className="space-y-4">
      <Label>Add your bid price</Label>
      <Input />
      <Label>Quote Outline</Label>
      <Textarea />
      <Button className="w-full rounded-full">Add</Button>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_API_ENDPOINT } from "@/lib/config/data";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AddCategory() {
  const [cookies] = useCookies(["ghost"]);

  const [icon, setIcon] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const qCLient = useQueryClient();

  const handleConfirm = async () => {
    if (!icon || !name.trim()) {
      alert("Please provide both a category name and an icon.");
      return;
    }

    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name.trim());

    try {
      const res = await fetch(`${BASE_API_ENDPOINT}/admin/add-category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.ghost}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed:", data);
        toast.error(data.message ?? "Something went wrong");
        return;
      }

      toast.success(data.message ?? "Category added ✅");
      setIcon(null);
      setName("");
      setOpen(false); // Close dialog on success
      qCLient.invalidateQueries({
        queryKey: ["category"],
      });
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Label htmlFor="icon">Upload Category Icon:</Label>
          <Input
            id="icon"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setIcon(e.target.files[0]);
              }
            }}
          />
          <Label htmlFor="name">Category name:</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here..."
          />
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm} disabled={!icon || !name.trim()}>
            Confirm Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

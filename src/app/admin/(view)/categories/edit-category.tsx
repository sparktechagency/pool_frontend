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
import { Edit3Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface EditCategoryProps {
  id: string;
  currentName?: string;
}

export default function EditCategory({
  id,
  currentName = "",
}: EditCategoryProps) {
  const [cookies] = useCookies(["adminGhost"]);
  // const { data, isPending } = useQuery({
  //   queryKey: ["view_category"],
  //   queryFn: () => {
  //     return viewCategoryApi(id, cookies.adminGhost);
  //   },
  // });
  const [icon, setIcon] = useState<File | null>(null);
  const [name, setName] = useState(currentName);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [expectedBudget, setExpectedBudget] = useState(false);
  const qCLient = useQueryClient();

  const handleConfirm = async () => {
    if (!icon && !name.trim()) {
      alert("Please update at least one field.");
      return;
    }

    const formData = new FormData();
    if (icon) formData.append("icon", icon);
    if (name.trim()) formData.append("name", name.trim());
    formData.append("description", description);
    formData.append("_method", "PUT"); // static
    if (expectedBudget) {
      formData.append("expected_budget", "YES");
    }
    try {
      const res = await fetch(
        `${BASE_API_ENDPOINT}/admin/edit-category/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookies.adminGhost}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed:", data);
        toast.error(data.message ?? "Something went wrong");
        return;
      }

      toast.success(data.message ?? "Category updated ✅");
      setIcon(null);
      setOpen(false);
      qCLient.invalidateQueries({ queryKey: ["category"] });
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-accent-foreground">
          <Edit3Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Label htmlFor="icon">Update Category Icon:</Label>
          <Input
            id="icon"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setIcon(e.target.files[0]);
              }
            }}
          />
          <Label htmlFor="name">Category Name:</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type new name..."
          />
          <Label htmlFor="description">Category description:</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here..."
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="expectedBudget"
              checked={expectedBudget}
              onCheckedChange={(checked) => setExpectedBudget(checked === true)}
            />
            <Label htmlFor="expectedBudget">Need budget field?</Label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm} disabled={!icon && !name.trim()}>
            Confirm Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

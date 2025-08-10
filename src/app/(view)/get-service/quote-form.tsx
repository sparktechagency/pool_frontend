/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { BASE_API_ENDPOINT } from "@/lib/config/data";
import { useRouter } from "next/navigation";
const serviceList = [
  { icon: "/icon/brush.svg", title: "Pool Cleaning" },
  { icon: "/icon/equipment.svg", title: "Repairs & Equipment" },
  { icon: "/icon/swimming-pool.svg", title: "Pool Construction" },
  { icon: "/icon/farm-house.svg", title: "Pool Inspection" },
  { icon: "/icon/smartphone.svg", title: "Lighting & Automation" },
];

const formSchema = z.object({
  service: z.string().min(1, "Service is required"),
  describe_issue: z.string().min(1, "Describe the issue"),
  property_type: z.string(),
  service_type: z.string(),
  pool_depth: z.string(),
  date: z.string(),
  time: z.string(),
  zip_code: z.string(),
  address: z.string(),
  expected_budget: z.string().optional(),
});

export default function QuoteForm() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cookies] = useCookies(["ghost"]);
  const navig = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      describe_issue: "",
      property_type: "",
      service_type: "",
      pool_depth: "",
      date: "",
      time: "",
      zip_code: "",
      address: "",
      expected_budget: "",
    },
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const onSubmit = async (data: any) => {
    if (data.date) {
      // Assuming formatDate is correct and returns a string
      data.date = formatDate(data.date);
    }
    const formData = new FormData();

    // Append other data fields to the formData
    Object.entries(data).forEach(([key, value]) => {
      // Skip photos as we've already handled it manually
      if (key === "photos") return;
      if (typeof value === "string" && value.trim() !== "") {
        formData.append(key, value);
      } else if (typeof value === "number") {
        formData.append(key, value.toString());
      }
    });
    formData.append("photos[0]", selectedImage as File);

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    try {
      const response = await fetch(`${BASE_API_ENDPOINT}/user/create-quote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.ghost}`,
        },
        body: formData, // Must be FormData if uploading files
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Something went wrong!");
        return;
      }

      toast.success(data.message ?? "Quote created successfully!");
      console.log(data);
      reset();
      navig.push("/my-orders");
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong!");
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      console.log("FILE");
      console.log(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    const input = document.getElementById("img_up") as HTMLInputElement;
    if (input) input.value = "";
  };

  const isConstruction = selectedType === "pool construction";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Select
        onValueChange={(value) => {
          setSelectedType(value);
          setValue("service", value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select service" />
        </SelectTrigger>
        <SelectContent>
          {serviceList.map((x, i) => (
            <SelectItem key={i} value={x.title.toLowerCase().trim()}>
              <div className="flex items-center gap-2">
                <Image src={x.icon} width={24} height={24} alt={x.title} />
                <span>{x.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.service && (
        <p className="text-red-500">{errors.service.message}</p>
      )}

      <Label>Describe the issue:</Label>
      <Textarea
        {...register("describe_issue")}
        placeholder="Describe issue..."
      />
      {errors.describe_issue && (
        <p className="text-red-500">{errors.describe_issue.message}</p>
      )}

      <Label>Property type :</Label>
      <RadioGroup
        onValueChange={(value) => setValue("property_type", value)}
        className="gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="family" id="property-family" />
          <Label htmlFor="property-family">Single family home</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="commercial" id="property-commercial" />
          <Label htmlFor="property-commercial">Commercial Property</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="apartment" id="property-apartment" />
          <Label htmlFor="property-apartment">Apartment</Label>
        </div>
      </RadioGroup>

      <Label>Service type :</Label>
      <RadioGroup
        onValueChange={(value) => setValue("service_type", value)}
        className="gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pool service" id="service-pool" />
          <Label htmlFor="service-pool">Pool Service</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pool and spa" id="service-spa" />
          <Label htmlFor="service-spa">Pool & Spa</Label>
        </div>
      </RadioGroup>

      <Label>Pool Depth:</Label>
      <Select onValueChange={(val) => setValue("pool_depth", val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Depth" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 8 }).map((_, i) => (
            <SelectItem key={i} value={String(i + 4)}>
              {i + 4}′
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input type="date" {...register("date")} />
        <Input type="time" {...register("time")} />
      </div>

      <Input type="text" {...register("zip_code")} placeholder="Zip Code" />
      <Input type="text" {...register("address")} placeholder="Address" />

      {isConstruction && (
        <Input
          type="number"
          {...register("expected_budget")}
          placeholder="Expected Budget"
        />
      )}

      <Label htmlFor="img_up">Upload any photos of the issue.</Label>
      <label htmlFor="img_up">
        <Card className="hover:bg-accent-foreground/5 transition-colors cursor-pointer relative">
          <CardContent className="aspect-[4/1] flex justify-center items-center overflow-hidden relative">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Selected Image"
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <ImageIcon className="text-accent-foreground size-16" />
            )}
          </CardContent>
          {previewUrl && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 rounded-full"
              onClick={handleRemoveImage}
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </Card>
      </label>
      <input
        type="file"
        id="img_up"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      <Button
        type="submit"
        className={`w-1/2 mx-auto flex bg-[#003B73] mt-8 "
        }`}
        size="lg"
      >
        Add
      </Button>
    </form>
  );
}

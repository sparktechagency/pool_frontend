"use client";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getProfileApi } from "@/lib/api/auth/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { serverImageBuilder } from "@/lib/formatter";
import { AnyType } from "@/lib/config/error-type";
import { BASE_API_ENDPOINT } from "@/lib/config/data";
import { toast } from "sonner";

export default function AvatarControl() {
  const [cookies] = useCookies(["ghost"]);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data, isPending }: AnyType = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(cookies.ghost),
  });

  const { mutate: updateAvatar, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("_method", "PATCH");

      const res = await fetch(`${BASE_API_ENDPOINT}/admin/update-profile`, {
        method: "POST", // backend expects PATCH through _method
        headers: {
          Authorization: `Bearer ${cookies.ghost}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Avatar updated successfully");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateAvatar(file);
    }
  };

  return (
    <>
      {isPending ? (
        <div className={`flex justify-center items-center h-24 mx-auto`}>
          <Skeleton className="size-[140px] rounded-full" />
        </div>
      ) : (
        <div className="size-[140px] relative">
          <Avatar className="size-[140px]">
            <AvatarImage src={serverImageBuilder(data?.data?.avatar)} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>

          <Button
            className="absolute bottom-0 right-0 z-30"
            variant="outline"
            size="icon"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <EditIcon />
          </Button>

          <Input
            ref={fileInputRef}
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </>
  );
}

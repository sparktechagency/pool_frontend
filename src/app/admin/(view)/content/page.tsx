"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { EditorTextChangeEvent } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createContentApi } from "@/lib/api/admin/admin";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";
import { toast } from "sonner";
import { getPageApi } from "@/lib/api/core/core";

export default function Page() {
  const [cookies] = useCookies(["ghost"]);
  const [text, setText] = useState<string>("");

  const { mutate } = useMutation({
    mutationKey: ["tnc"],
    mutationFn: (data: AnyType) => {
      return createContentApi(data, cookies.ghost);
    },
  });

  useEffect(() => {
    async function doWork() {
      try {
        const call: AnyType = await getPageApi("tnc");
        if (!call.status) {
          toast.error(call.message ?? "Something went wrong");
        } else {
          setText(call?.data?.content);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
    doWork();
  }, []);

  return (
    <div className="!pb-12 !pr-6 !space-y-6">
      <h2 className="text-3xl font-bold">Terms & Conditions</h2>
      <Editor
        value={text || ""}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? "")}
        style={{ height: "320px" }}
      />
      <Button
        onClick={() => {
          mutate(
            { page_type: "tnc", content: text }, // 👈 using "tnc" here
            {
              onError: (err: AnyType) => {
                toast.error(
                  err.message ??
                    err.data.message ??
                    "Failed to submit the content"
                );
              },
              onSuccess: (data: AnyType) => {
                toast.success(
                  data.message ?? "Successfully submitted the content"
                );
              },
            }
          );
        }}
      >
        Confirm Update
      </Button>
    </div>
  );
}

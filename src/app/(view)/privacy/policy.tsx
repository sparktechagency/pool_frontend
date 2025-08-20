"use client"; // since DOMPurify needs to run on the client

import { getPageApi } from "@/lib/api/core/core";
import { AnyType } from "@/lib/config/error-type";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Policy() {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const call: AnyType = await getPageApi("privacy");
      console.log(call);

      if (!call.status) {
        setError(call.message ?? "Privacy policy data not found");
        return;
      }

      // sanitize HTML content
      const clean = DOMPurify.sanitize(call?.data?.content ?? "");
      setContent(clean);
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="mt-6 mb-12 px-6 flex justify-center items-center">
        {error}
      </div>
    );
  }

  return (
    <div
      className="mt-6 mb-12 px-6"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

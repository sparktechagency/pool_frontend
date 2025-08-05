import { getPageApi } from "@/lib/api/core/core";
import { AnyType } from "@/lib/config/error-type";
import React from "react";

export default async function Policy() {
  const call: AnyType = await getPageApi("legal_resources");

  if (!call.status) {
    return (
      <div className="mt-6 mb-12 px-6 flex justify-center items-center">
        {call.message ?? "Privacy policy data not found"}
      </div>
    );
  }

  return <div className="mt-6 mb-12 px-6">Policy</div>;
}

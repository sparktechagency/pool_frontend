import React from "react";
import { getProfileApi } from "@/lib/api/auth/auth";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";
import OrderList from "./order-list";

export default async function OrderPage() {
  const token = (await cookies()).get("ghost")?.value;
  if (!token) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        You must be logged in as a Home owner
      </div>
    );
  }
  const call: AnyType = await getProfileApi(token);

  if (call?.data?.role !== "PROVIDER") {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        You must be logged in as a Home owner
      </div>
    );
  }

  return <OrderList />;
}

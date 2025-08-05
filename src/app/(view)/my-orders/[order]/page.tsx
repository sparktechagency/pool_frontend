import React from "react";
import Order from "./order";

export default async function Page({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const id = (await params).order;
  return (
    <main className="my-12! px-8!">
      <Order id={id} />
    </main>
  );
}

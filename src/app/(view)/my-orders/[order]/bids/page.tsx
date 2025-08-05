import Bread from "@/components/core/bread";
import BidList from "./bid-list";

export default async function Page({
  params,
}: {
  params: Promise<{ order: string }>;
}) {
  const order = (await params).order;
  console.log(order);

  return (
    <>
      <Bread />
      <main className="px-8! py-12!">
        <BidList />
      </main>
    </>
  );
}

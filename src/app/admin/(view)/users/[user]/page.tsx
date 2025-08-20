import React, { Suspense } from "react";
import Goback from "./goback";
import User from "./user";
import { Loader2Icon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;
  console.log(user);

  return (
    <div className="space-y-6">
      <div className="py-6 px-6 bg-background shadow rounded-lg">
        <Goback />
        <p className="text-sm font-semibold text-muted-foreground mt-2 ml-8">
          Provider details at a glance
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          {user && <User user={user} />}
        </Suspense>
      </div>
    </div>
  );
}

import React, { Suspense } from "react";
import Notifications from "./notifications";

export default function Page() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="w-full mt-8">
        <Suspense>
          <Notifications />
        </Suspense>
      </div>
    </main>
  );
}

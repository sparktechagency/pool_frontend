import React, { Suspense } from "react";
import Policy from "./policy";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <>
      <header
        className="w-screen h-screen bg-center bg-cover flex justify-center flex-col items-center text-background brightness-75"
        style={{ backgroundImage: `url('/image/help.jpg')` }}
      >
        <h1 className="text-7xl font-bold">Privacy Policy</h1>
        <h3 className="text-lg mt-6">Updated July 17, 2025</h3>
      </header>
      <main>
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <Policy />
        </Suspense>
      </main>
    </>
  );
}

import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ProfileSec from "./profile-section";

export default async function Page() {
  return (
    <main className="my-12!">
      <Suspense
        fallback={
          <>
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          </>
        }
      >
        <ProfileSec />
      </Suspense>
    </main>
  );
}

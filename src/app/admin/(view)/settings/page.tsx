"use client";

import React from "react";
import ProfUpdateForm from "./prof-update-form";

import Link from "next/link";
import AvatarControl from "./avatar";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="!pb-12 !pr-6">
      <div className="flex flex-row justify-center items-center">
        <AvatarControl />
      </div>
      <div className="">
        <ProfUpdateForm />
      </div>
      <div className="!mt-12 w-2/3 !mx-auto rounded-lg border-2 !p-6">
        <Button className="w-full text-sm" variant="outline" asChild>
          <Link href="settings/change-pass">Change Password</Link>
        </Button>
      </div>
    </div>
  );
}

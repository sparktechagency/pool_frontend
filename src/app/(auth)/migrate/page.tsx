"use client";

import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";

import { migrateApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";

type MigratePayload = {
  google_id: string;
  email: string;
  full_name: string;
};

export default function MigrationPage() {
  const { data: session }: AnyType = useSession();
  const [, setCookie] = useCookies(["ghost"]);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["migrate"],
    mutationFn: (data: MigratePayload) => migrateApi(data),
    onError: (err: AnyType) => {
      console.error("Migration failed:", err);
    },
    onSuccess: (data: AnyType) => {
      if (data?.token) {
        setCookie("ghost", data.token, { path: "/" });
      }
      signOut({ redirect: false }).then(() => router.push("/"));
    },
  });

  // Handles the migration once session is available
  const handleMigration = () => {
    if (!session?.user) return;

    mutate({
      google_id: session.user.id,
      email: session.user.email,
      full_name: session.user.name,
    });
  };

  useEffect(() => {
    if (session) handleMigration();
  }, [session]);

  return (
    <div className="flex justify-center items-center h-24 mx-auto">
      <Loader2Icon className="animate-spin" size={32} />
    </div>
  );
}

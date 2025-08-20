/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import { cookies } from "next/headers";
import { getProfileApi } from "@/lib/api/auth/auth";
import { notFound, redirect } from "next/navigation";
import { AnyType } from "@/lib/config/error-type";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("ghost")?.value;
  let user: AnyType;

  try {
    user = await getProfileApi(token as string);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    cookieStore.delete("ghost");
    redirect("/login");
  }

  if (token) {
    if (!user.status) {
      cookieStore.delete("ghost");
      redirect("/login");
    }
    switch (user.data.role) {
      case "ADMIN":
        redirect("/admin/dashboard");
      case "PROVIDER":
      case "USER":
        notFound();
      default:
        notFound();
    }
  }

  return <Suspense fallback="Please wait a second...">{children}</Suspense>;
}

import Sidebar from "@/components/core/sidebar";
import { Button } from "@/components/ui/button";
import { getProfileApi } from "@/lib/api/auth/auth";
import { AnyType } from "@/lib/config/error-type";
import { BellIcon } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "PoolValet Admin Panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("ghost")?.value;
  let user: AnyType;

  if (!token) {
    return redirect("/admin/login");
  }

  try {
    user = token ? await getProfileApi(token) : null;
  } catch {
    return redirect("/admin/login");
  }

  if (user?.data?.role === "ADMIN") {
    return (
      <>
        <main className="grid grid-cols-11 pr-6">
          <div className="col-span-2 ">
            <div className="h-dvh w-full sticky top-0 left-0">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-9 flex flex-col justify-start items-start">
            <div className="h-[64px] w-full flex flex-row justify-between items-center !pr-6">
              <h3 className="text-2xl font-bold">Hello, Admin</h3>
              <div className=""></div>
              <div className="flex items-center gap-2">
                <Button size={"icon"} variant="ghost" asChild>
                  <Link href="/admin/notifications">
                    <BellIcon fill="#000000" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full flex-1">{children}</div>
          </div>
        </main>
      </>
    );
  }

  return redirect("/admin/login");
}

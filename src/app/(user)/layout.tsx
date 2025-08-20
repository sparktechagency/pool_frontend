import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { MessageSquareTextIcon } from "lucide-react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("ghost");
  if (!token) {
    return redirect("/");
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

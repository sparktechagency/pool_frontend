import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("ghost")?.value;
  if (token) {
    return notFound();
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

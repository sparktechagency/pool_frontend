import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
// import { Button } from "@/components/ui/button";
// import { MessageSquareTextIcon } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        {children}
      </Suspense>
      <Footer />
    </>
  );
}

import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
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
      {children}
      {/* <Button className="size-12 rounded-full overflow-visible fixed right-12 bottom-12 shadow-lg shadow-foreground/70">
        <MessageSquareTextIcon className="size-5" />
        <div className="absolute -top-1 -right-1 size-5 text-xs bg-destructive flex justify-center items-center rounded-full">
          12
        </div>
      </Button> */}
      <Footer />
    </>
  );
}

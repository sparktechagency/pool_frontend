"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useCookies } from "react-cookie";
import All from "./all";
import Accepted from "./accepted";
import { useSearchParams } from "next/navigation";

export default function BidList({ id }: { id: string | number }) {
  const [isClient, setIsClient] = React.useState(false);
  const [cookies] = useCookies(["ghost"]);

  const accepted = useSearchParams().get("accepted");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render skeleton or blank until client mounts to avoid mismatch
    return (
      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Service Provider Bids
          </CardTitle>
        </CardHeader>
        <CardContent className="h-24 w-full flex justify-center items-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (!cookies.ghost || !id) {
    return (
      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Service Provider Bids
          </CardTitle>
        </CardHeader>
        <CardContent className="h-24 w-full flex justify-center items-center">
          You must log in to see your bids
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Service Provider Bids
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            className="mb-6"
            defaultValue={accepted === "true" ? "password" : "account"}
          >
            <TabsList className="bg-inherit">
              <TabsTrigger value="account">All Bids</TabsTrigger>
              <TabsTrigger value="password">Accepted Bids</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <All id={id} />
            </TabsContent>
            <TabsContent value="password">
              <Accepted id={id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="mt-24 mb-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <PaginationItem key={num}>
                <PaginationLink href="#">{num}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

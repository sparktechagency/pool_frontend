"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Loader2Icon, StarIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCheckBidsApi } from "@/lib/api/core/core";
import { useCookies } from "react-cookie";

export default function BidList() {
  const [cookies] = useCookies(["ghost"]);
  const { data, isPending } = useQuery({
    queryKey: ["bids"],
    queryFn: () => {
      return getCheckBidsApi(cookies.ghost);
    },
  });
  console.log(data);

  if (!cookies.ghost) {
    return (
      <Card className="w-2/3 mx-auto!">
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

  if (isPending) {
    return (
      <Card className="w-2/3 mx-auto!">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Service Provider Bids
          </CardTitle>
        </CardHeader>
        <CardContent className="h-24 w-full flex justify-center items-center">
          <Loader2Icon className={`animate-spin`} />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-2/3 mx-auto!">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Service Provider Bids
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs className="mb-6!" defaultValue="account">
            <TabsList className="bg-inherit">
              <TabsTrigger value="account">All Bids</TabsTrigger>
              <TabsTrigger value="password">Accepted Bids</TabsTrigger>
            </TabsList>
          </Tabs>
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="text-center">Provider</TableHead>
                <TableHead className="text-center">Price Offered</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold flex items-center gap-2 justify-center">
                    <Avatar>
                      <AvatarImage
                        src={`https://avatar.iran.liara.run/public/${i + 1}`}
                      />
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    CleanPro Pools
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    $4823.75
                  </TableCell>
                  <TableCell className="text-center flex gap-1 justify-center">
                    <StarIcon fill="#FFD700" stroke="" className="size-5" /> 4.8
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" asChild>
                      <Link href="bids/details">
                        View Details <ArrowRight />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-24! mb-12!">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">6</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { myOrdersApi } from "@/lib/api/core/core";
import { AnyType } from "@/lib/config/error-type";
import { useCookies } from "react-cookie";

export default function OrderList() {
  const [activeTab, setActiveTab] = useState<
    "" | "Pending" | "In progress" | "Completed"
  >("");
  const [page, setPage] = useState(1);
  const [cookies] = useCookies(["ghost"]);
  const { data, isFetching }: AnyType = useQuery({
    queryKey: ["order", activeTab, page],
    queryFn: () => myOrdersApi(activeTab, page, cookies.ghost),
  });

  const quotes = data?.quotes?.data || [];
  const links = data?.quotes?.links || [];

  const handleTabChange = (
    status: "" | "Pending" | "In progress" | "Completed"
  ) => {
    setActiveTab(status);
    setPage(1); // Reset to page 1 when tab changes
  };

  const handlePageChange = (url: string | null) => {
    if (!url) return;
    const params = new URL(url).searchParams;
    const pageNum = params.get("page");
    if (pageNum) setPage(Number(pageNum));
  };

  return (
    <>
      <Card className="lg:w-2/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground text-center lg:text-start">
            My orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs className="mb-6" defaultValue="">
            <TabsList className="bg-inherit">
              <TabsTrigger value="" onClick={() => handleTabChange("")}>
                All Orders
              </TabsTrigger>
              <TabsTrigger
                value="Pending"
                onClick={() => handleTabChange("Pending")}
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="In progress"
                onClick={() => handleTabChange("In progress")}
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="Completed"
                onClick={() => handleTabChange("Completed")}
              >
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="text-center">Service Type</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Scheduled Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : quotes.length > 0 ? (
                quotes.map((quote: AnyType) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium text-center">
                      {quote.service_type}
                    </TableCell>
                    <TableCell className="font-semibold flex items-center gap-2 justify-center text-amber-500">
                      {quote.status}
                    </TableCell>
                    <TableCell className="text-center">
                      {quote.scheduled_date}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" asChild>
                        <Link href={`/my-orders/${quote.id}`}>
                          View Details <ArrowRight />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-24 mb-12">
        <Pagination>
          <PaginationContent>
            {links.map((link: AnyType, index: number) => {
              if (link.label.includes("Previous")) {
                return (
                  <PaginationItem key={index}>
                    <PaginationPrevious
                      onClick={() => handlePageChange(link.url)}
                    />
                  </PaginationItem>
                );
              } else if (link.label.includes("Next")) {
                return (
                  <PaginationItem key={index}>
                    <PaginationNext
                      onClick={() => handlePageChange(link.url)}
                    />
                  </PaginationItem>
                );
              } else {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(link.url)}
                      aria-current={link.active ? "page" : undefined}
                      className={
                        link.active ? "bg-accent text-accent-foreground" : ""
                      }
                    >
                      {link.label}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            })}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

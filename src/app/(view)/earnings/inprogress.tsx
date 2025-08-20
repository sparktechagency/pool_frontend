"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { serverImageBuilder } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { AnyType } from "@/lib/config/error-type";
import { useQuery } from "@tanstack/react-query";
import { earningsApi } from "@/lib/api/core/core";
import { useCookies } from "react-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function InProgress() {
  const [cookies] = useCookies(["ghost"]);
  const [page, setPage] = useState(1);
  const [cookieLoaded, setCookieLoaded] = useState(false);
  const [ghostCookie, setGhostCookie] = useState<string | null>(null);

  useEffect(() => {
    setGhostCookie(cookies.ghost || null);
    setCookieLoaded(true);
  }, [cookies.ghost]);

  const { data, isPending, isError }: AnyType = useQuery({
    queryKey: ["quotes", page],
    queryFn: () => earningsApi(cookies.ghost, page, "In progress"),
    enabled: !!ghostCookie, // Only run when cookie exists
  });

  if (!cookieLoaded) return null;

  if (!ghostCookie) {
    return (
      <div className="flex justify-center py-8 text-sm font-semibold">
        You must be logged in to see this content
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center py-8 text-sm font-semibold">
        Failed to fetch quotes
      </div>
    );
  }

  const quoteData = data?.data?.data ?? [];

  return (
    <>
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Service Type</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isPending || isError ? Array.from({ length: 10 }) : quoteData).map(
            (item: AnyType, i: number) => (
              <TableRow key={i}>
                <TableCell className="text-center">
                  {isPending ? (
                    <Skeleton className="h-4 w-10 mx-auto" />
                  ) : (
                    `#${item?.id}`
                  )}
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </>
                  ) : (
                    <>
                      <Avatar>
                        <AvatarImage
                          src={serverImageBuilder(item?.quote?.user?.avatar)}
                        />
                        <AvatarFallback className="uppercase">
                          {item?.quote?.user?.full_name?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {item?.quote?.user?.full_name}
                    </>
                  )}
                </TableCell>
                <TableCell className="text-center capitalize">
                  {isPending ? (
                    <Skeleton className="h-4 w-20 mx-auto" />
                  ) : (
                    item?.quote?.service_type
                  )}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {isPending ? (
                    <Skeleton className="h-4 w-16 mx-auto" />
                  ) : (
                    <span
                      className={cn(
                        item?.quote?.status === "Pending"
                          ? "text-amber-500"
                          : item?.quote?.status === "In progress"
                          ? "text-teal-500"
                          : "text-green-700"
                      )}
                    >
                      {item?.quote?.status}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {isPending ? (
                    <Skeleton className="h-4 w-16 mx-auto" />
                  ) : (
                    `$${item?.price_offered}`
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isPending ? (
                    <Skeleton className="h-8 w-24 mx-auto" />
                  ) : (
                    <Button variant="ghost" asChild>
                      <Link href={`/service/${item?.id}`}>
                        View Details <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent className="flex items-center gap-2">
            {(() => {
              const totalLinks = data?.data?.links || [];
              const currentPage = page;

              const numberedLinks = totalLinks.filter(
                (l: AnyType) => !isNaN(parseInt(l.label))
              );

              const currentIndex = numberedLinks.findIndex(
                (l: AnyType) => parseInt(l.label) === currentPage
              );

              let start = Math.max(currentIndex - 2, 0);
              const end = Math.min(start + 5, numberedLinks.length);

              if (end - start < 5) {
                start = Math.max(end - 5, 0);
              }

              const displayedLinks = numberedLinks.slice(start, end);

              const prevLink = totalLinks.find((l: AnyType) =>
                l.label.includes("Previous")
              );
              const nextLink = totalLinks.find((l: AnyType) =>
                l.label.includes("Next")
              );

              return (
                <>
                  {prevLink && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          if (prevLink.url && !isPending) {
                            setPage(currentPage - 1);
                          }
                        }}
                        className={
                          prevLink.url === null || isPending
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      >
                        <ArrowLeft />
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {displayedLinks.map((link: AnyType, idx: number) => {
                    const pageNum = parseInt(link.label);
                    const isActive = pageNum === currentPage;
                    return (
                      <PaginationItem key={idx}>
                        <PaginationLink
                          onClick={(e) => {
                            e.preventDefault();
                            if (!isPending) setPage(pageNum);
                          }}
                          className={
                            isActive ? "bg-primary text-primary-foreground" : ""
                          }
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  {nextLink && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          if (nextLink.url && !isPending) {
                            setPage(currentPage + 1);
                          }
                        }}
                        className={
                          nextLink.url === null || isPending
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      >
                        <ArrowRight />
                      </PaginationLink>
                    </PaginationItem>
                  )}
                </>
              );
            })()}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

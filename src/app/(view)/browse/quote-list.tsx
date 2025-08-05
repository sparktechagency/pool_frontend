"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { browseQuotesApi } from "@/lib/api/core/core";
import { useCookies } from "react-cookie";
import { AnyType } from "@/lib/config/error-type";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function QuoteList() {
  const [cookies] = useCookies(["ghost"]);
  const [page, setPage] = useState(1);
  const { data, isPending, isError }: AnyType = useQuery({
    queryKey: ["quotes", page],
    queryFn: () => browseQuotesApi(cookies.ghost, page),
  });

  const [cookieLoaded, setCookieLoaded] = useState(false);
  const [ghostCookie, setGhostCookie] = useState<string | null>(null);

  useEffect(() => {
    setGhostCookie(cookies.ghost || null);
    setCookieLoaded(true);
  }, [cookies.ghost]);

  if (!cookieLoaded) return null;

  if (!ghostCookie) {
    return (
      <Card className="w-2/3 mx-auto!">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Quotes near me
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center mt-6 text-sm font-semibold">
          You must be logged in to see this content
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-2/3 mx-auto!">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Quotes near me
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center mt-6">
          Failed to fetch quotes
        </CardContent>
      </Card>
    );
  }

  const quoteData = data?.data?.data ?? [];

  return (
    <>
      <Card className="w-2/3 mx-auto!">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Quotes near me
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Budget</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isPending || isError
                ? Array.from({ length: 10 })
                : quoteData
              ).map((item: AnyType, i: number) => (
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
                          <AvatarImage src={item.user.avatar} />
                          <AvatarFallback>UI</AvatarFallback>
                        </Avatar>
                        {item?.user?.full_name}
                      </>
                    )}
                  </TableCell>
                  <TableCell className="text-center capitalize">
                    {isPending ? (
                      <Skeleton className="h-4 w-20 mx-auto" />
                    ) : (
                      item?.service_type
                    )}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {isPending ? (
                      <Skeleton className="h-4 w-16 mx-auto" />
                    ) : (
                      `$${item?.expected_budget}`
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {isPending ? (
                      <Skeleton className="h-8 w-24 mx-auto" />
                    ) : (
                      <Button variant="ghost" asChild>
                        <Link href={`/browse/${item?.id}`}>
                          View Details <ArrowRight />
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-24! mb-12! flex justify-center">
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

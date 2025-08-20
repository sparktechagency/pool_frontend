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
import { Button } from "@/components/ui/button";
import { CameraOffIcon, EyeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getQuoteListingApi } from "@/lib/api/admin/admin";
import { useCookies } from "react-cookie";
import { serverImageBuilder } from "@/lib/formatter";
import Image from "next/image";
import { AnyType } from "@/lib/config/error-type";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ViewQuote from "./view-quote";

export default function BrandTable() {
  const [cookies] = useCookies(["ghost"]);
  const [page, setPage] = useState(1);

  const { data, isFetching }: AnyType = useQuery({
    queryKey: ["quotes", page],
    queryFn: () => getQuoteListingApi(cookies.ghost, page),
  });

  const customers = data?.quotes?.data ?? [];

  const renderSkeletonRows = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell className="font-medium flex items-center gap-2">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2 pl-[25%]!">
            <Skeleton className="size-12 rounded-lg" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center">
          <Skeleton className="h-4 w-12 mx-auto" />
        </TableCell>
        <TableCell className="text-center !space-x-2">
          <Skeleton className="h-8 w-8 rounded-md mx-auto" />
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Owner Name</TableHead>
            <TableHead className="text-center">Service Name</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching && customers.length === 0
            ? renderSkeletonRows()
            : customers.map((customer: AnyType, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={serverImageBuilder(customer.user.avatar) ?? "/"}
                      />
                      <AvatarFallback>
                        {customer.user.full_name.charAt(0)}
                        {customer.user.full_name.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center items-start h-full">
                      <h4>{customer.user.full_name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {customer.user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 pl-[25%]!">
                      {customer.photos.length > 0 ? (
                        <Image
                          src={serverImageBuilder(customer.photos[0] ?? "/")}
                          alt="Quote photo"
                          width={48}
                          height={48}
                          className="rounded-lg object-cover bg-secondary"
                        />
                      ) : (
                        <div className="size-12 bg-secondary rounded-lg text-muted-foreground flex justify-center items-center">
                          <CameraOffIcon className="size-4" />
                        </div>
                      )}
                      <div className="flex flex-col justify-center items-start h-full">
                        <h4 className="font-semibold">{customer.service}</h4>
                        <p className="text-xs text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {customer.expected_budget === "0.00"
                      ? "N/A"
                      : `$${customer.expected_budget}`}
                  </TableCell>
                  <TableCell className="text-center !space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-blue-500"
                          size="icon"
                        >
                          <EyeIcon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <ViewQuote id={customer.id} />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              className="w-full"
                              size={"lg"}
                              variant={"outline"}
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          {/* If fetching next page, overlay skeletons without clearing data */}
          {isFetching && customers.length > 0 && renderSkeletonRows()}
        </TableBody>
      </Table>

      <div className="border-t mt-2! flex flex-row justify-between items-center pt-6! text-sm">
        <p>
          Page {data?.quotes?.current_page} of {data?.quotes?.last_page}
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            disabled={data?.quotes?.current_page === data?.quotes?.from}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={data?.quotes?.current_page === data?.quotes?.last_page}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

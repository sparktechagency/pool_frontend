"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon, SearchIcon, TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { deleteUserApi, getUsersApi } from "@/lib/api/admin/admin";
import { Input } from "@/components/ui/input";
import { AnyType } from "@/lib/config/error-type";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";

function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function BrandTable() {
  const [cookies] = useCookies(["ghost"]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const { data, isFetching, refetch }: AnyType = useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: () => getUsersApi(page, debouncedSearch, cookies.ghost),
  });

  // Determine how many rows to render during skeleton
  const rowCount = useMemo(() => {
    if (data?.users?.data?.length) return data.users.data.length;
    return 8; // default skeleton count if no data yet
  }, [data]);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="w-full border rounded-lg flex items-center px-4!">
          <SearchIcon className="text-muted-foreground size-4" />
          <Input
            placeholder="Search by name or email"
            className="border-0 shadow-none outline-0! ring-0!"
            inputMode="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      <Table>
        <TableHeader className="bg-none">
          <TableRow>
            <TableHead className="w-[100px] text-center">User</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching
            ? Array.from({ length: rowCount }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="flex items-center gap-2">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-5 w-16 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))
            : data?.users?.data?.map((customer: AnyType, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="size-12">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.full_name.charAt(0)}
                        {customer.full_name.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center items-start h-full">
                      <h4>{customer.full_name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {customer.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full grid grid-cols-5">
                      <div className="col-span-2"></div>
                      <Badge
                        variant={
                          customer.role === "PROVIDER" ? "provider" : "owner"
                        }
                      >
                        {customer.role}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center !space-x-2">
                    <Button
                      variant="ghost"
                      className="text-blue-500"
                      size="icon"
                      asChild
                    >
                      <Link href={`/admin/users/${customer.id}`}>
                        <EyeIcon />
                      </Link>
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-destructive"
                          size="icon"
                        >
                          <TrashIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="left">
                        <PopoverArrow />
                        <h3>Are you sure?</h3>
                        <CardDescription>
                          You are going to delete this user account and this
                          cannot be undone.
                        </CardDescription>
                        <PopoverClose asChild>
                          <Button
                            variant="destructive"
                            className="text-sm !mt-6 !bg-background border !border-destructive !text-destructive"
                            onClick={async () => {
                              try {
                                const call: AnyType = await deleteUserApi(
                                  customer.id,
                                  cookies.ghost
                                );
                                if (!call.status) {
                                  toast.error(
                                    call.message ??
                                      `Failed to delete ${customer.full_name}`
                                  );
                                } else {
                                  toast.success(
                                    call.message ??
                                      `${customer.full_name} deleted successfyully`
                                  );
                                  refetch();
                                }
                              } catch (error) {
                                console.error(error);
                                toast.error("Something went wrong");
                              }
                            }}
                          >
                            <TrashIcon />
                            Delete
                          </Button>
                        </PopoverClose>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <div className="border-t mt-2! flex flex-row justify-between items-center pt-6! text-sm">
        <p>
          Page {data?.users?.current_page} of {data?.users?.last_page}
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            disabled={data?.users?.current_page === data?.users?.from}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={data?.users?.current_page === data?.users?.last_page}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

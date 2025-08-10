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
import { EyeIcon, Loader2Icon, SearchIcon, TrashIcon } from "lucide-react";
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
import { getUsersApi } from "@/lib/api/admin/admin";
import { Input } from "@/components/ui/input";
import { AnyType } from "@/lib/config/error-type";

export default function BrandTable() {
  const [cookies] = useCookies(["ghost"]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isPending }: AnyType = useQuery({
    queryKey: ["users", page, search],
    queryFn: () => {
      return getUsersApi(page, search, cookies.ghost);
    },
  });

  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="w-full border rounded-lg flex items-center px-4!">
          <SearchIcon className="text-muted-foreground size-4" />
          <Input
            placeholder="Search by name or email"
            className="border-0 shadow-none outline-0! ring-0!"
            inputMode="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
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
          {isPending ? (
            <TableRow
              className={`flex justify-center items-center h-24 mx-auto`}
            >
              <TableCell>
                <Loader2Icon className={`animate-spin`} />
              </TableCell>
            </TableRow>
          ) : !data?.users ? (
            ""
          ) : (
            data?.users?.data?.map((customer: AnyType, index: number) => (
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
                    <h4 className="">{customer.full_name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="">
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
                  <Button variant="ghost" className="text-blue-500" size="icon">
                    <EyeIcon />
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
                        <Button variant="destructive" className="text-sm !mt-6">
                          <TrashIcon />
                          Delete
                        </Button>
                      </PopoverClose>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="border-t mt-2! flex flex-row justify-between items-center pt-6! text-sm">
        <p>
          Page {data?.users.current_page} of {data?.users.to}
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            disabled={data?.users.current_page === data?.users.from}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={data?.users.current_page === data?.users.last_page}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getTopProvidersApi } from "@/lib/api/core/core";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";
import ProviderCardWrapper from "./provider-card-wrapper";

export default async function ProviderList() {
  let call: AnyType = { status: false, message: "" };
  const token = (await cookies())?.get("ghost")?.value ?? "";

  try {
    call = await getTopProvidersApi(token);
  } catch (error: AnyType) {
    return (
      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Top Providers
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center text-muted-foreground text-sm font-bold">
          {error.data.message}
        </CardContent>
      </Card>
    );
  }

  if (!call.status) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center">
          {call.message || "Something went wrong"}
        </CardContent>
      </Card>
    );
  }

  if (!Array.isArray(call.data) || call.data.length === 0) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center">
          No providers found.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-2/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground">
            Top Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Provider</TableHead>
                <TableHead className="text-center">Address</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {call.data.map((provider: AnyType, i: number) => (
                <TableRow key={provider.id || i}>
                  <TableCell className="font-medium text-center">
                    #{provider.provider_id || "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold flex items-center gap-2 justify-center">
                    <Avatar>
                      <AvatarImage
                        src={
                          provider.provider.avatar ||
                          `https://avatar.iran.liara.run/public/${i + 1}`
                        }
                      />
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    {provider.provider.full_name || "Unknown"}
                  </TableCell>
                  <TableCell className="text-center">
                    {provider.provider.location || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    {provider.provider_id && (
                      <ProviderCardWrapper id={provider.provider_id} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-24 mb-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#">{page}</PaginationLink>
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

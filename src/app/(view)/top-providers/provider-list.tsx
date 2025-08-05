import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowRight,
  MailIcon,
  MapPinIcon,
  StarHalfIcon,
  StarIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTopProvidersApi } from "@/lib/api/core/core";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";

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
                    #{provider.id || "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold flex items-center gap-2 justify-center">
                    <Avatar>
                      <AvatarImage
                        src={
                          provider.avatarUrl ||
                          `https://avatar.iran.liara.run/public/${i + 1}`
                        }
                      />
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    {provider.name || "Unknown"}
                  </TableCell>
                  <TableCell className="text-center">
                    {provider.address || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost">
                          View Details <ArrowRight />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {provider.name || "Provider Details"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col justify-around items-center gap-2">
                          <Avatar className="size-24">
                            <AvatarImage
                              src={
                                provider.avatarUrl ||
                                `https://avatar.iran.liara.run/public/${i + 1}`
                              }
                            />
                            <AvatarFallback>UI</AvatarFallback>
                          </Avatar>
                          <h3 className="text-center text-2xl">
                            {provider.name || "N/A"}
                          </h3>
                          <p className="flex items-center gap-1 text-accent-foreground">
                            <MailIcon className="size-5" />
                            {provider.email || "No email"}
                          </p>
                          <p className="flex items-center gap-1 text-accent-foreground">
                            <MapPinIcon className="size-5" />
                            {provider.fullAddress || "No address"}
                          </p>
                          <div className="border rounded-lg w-full py-3 px-2 divide-y space-y-3">
                            <div className="grid grid-cols-2">
                              <p className="font-semibold">Service Rating</p>
                              <div className="flex items-center gap-1">
                                <span>{provider.rating || "N/A"}</span>
                                <StarIcon fill="#FFD700" stroke="" />
                                <StarIcon fill="#FFD700" stroke="" />
                                <StarIcon fill="#FFD700" stroke="" />
                                <StarIcon fill="#FFD700" stroke="" />
                                <StarHalfIcon fill="#FFD700" stroke="" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <p className="font-semibold">Order Completed</p>
                              <div>{provider.ordersCompleted || 0}</div>
                            </div>
                            <div className="grid grid-cols-2">
                              <p className="font-semibold">Canceled Orders</p>
                              <div>{provider.ordersCanceled || 0}</div>
                            </div>
                          </div>
                          <h4 className="text-center">What home owners say?</h4>
                          <div className="h-[200px] w-full border rounded-lg overflow-y-scroll">
                            {provider.reviews?.map(
                              (review: AnyType, ll: number) => (
                                <Card
                                  className="border-0 shadow-none"
                                  key={review.id || ll}
                                >
                                  <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="size-7">
                                          <AvatarImage
                                            src={
                                              review.avatarUrl ||
                                              `https://avatar.iran.liara.run/public/${ll}`
                                            }
                                          />
                                          <AvatarFallback>UI</AvatarFallback>
                                        </Avatar>
                                        <h3>{review.name || "Anonymous"}</h3>
                                      </div>
                                      <p className="flex items-center text-sm">
                                        <StarIcon
                                          fill="#FFD700"
                                          stroke=""
                                          className="size-5 mr-1"
                                        />
                                        {review.rating || "N/A"}
                                      </p>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <CardDescription>
                                      {review.comment ||
                                        "No comment available."}
                                    </CardDescription>
                                  </CardContent>
                                </Card>
                              )
                            ) || (
                              <p className="text-center p-4">
                                No reviews available.
                              </p>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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

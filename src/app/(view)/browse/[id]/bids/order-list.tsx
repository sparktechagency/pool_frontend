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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FinalSaveApi,
  getBiddingListApi,
  getMyBidApi,
} from "@/lib/api/core/core";
import { useCookies } from "react-cookie";
import { useParams, useRouter } from "next/navigation";
import { AnyType } from "@/lib/config/error-type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditForm from "./edit-form";
import { toast } from "sonner";

export default function OrderList() {
  const { id }: { id: string } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [cookies] = useCookies(["ghost"]);
  const navig = useRouter();
  const { data: myBidData, isPending: myBidPending }: AnyType = useQuery({
    queryKey: ["order", "myBid"],
    queryFn: () => getMyBidApi(id, cookies.ghost),
  });

  const { data, isPending }: AnyType = useQuery({
    queryKey: ["order", "bid"],
    queryFn: () => getBiddingListApi(id, cookies.ghost),
  });
  const { mutate } = useMutation({
    mutationKey: ["order"],
    mutationFn: () => {
      return FinalSaveApi(id, cookies.ghost);
    },
  });

  if (isPending) {
    return (
      <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
        <code className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre>
    );
  }
  if (!myBidPending) {
    console.log(myBidData);
  }
  const quotes = data?.data?.data;
  return (
    <>
      <Card className="lg:w-2/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-accent-foreground text-center lg:text-start">
            Bidding List
          </CardTitle>
          <CardDescription>
            Your Asking Bid Price:{" "}
            <span className="font-semibold text-green-600">
              ${myBidData?.data?.price_offered}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="uppercase!">
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Date & Time</TableHead>
                <TableHead className="text-center">Asking Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : quotes?.length > 0 ? (
                quotes?.map((quote: AnyType) => (
                  <TableRow key={quote.id}>
                    <TableCell>0100101</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No bids found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end items-center gap-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="rounded-full">
                Edit Your Bid
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your bid price</DialogTitle>
              </DialogHeader>
              <EditForm
                id={id}
                data={myBidData}
                closeDialog={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Button
            className="rounded-full"
            onClick={async () => {
              try {
                mutate(undefined, {
                  onError: (err) => {
                    toast.error(err.message ?? "Failed to save final");
                  },
                  onSuccess: (data: AnyType) => {
                    if (!data.status) {
                      toast.error(data.message ?? "Failed to save final");
                    } else {
                      toast.success(data.message ?? "Final Save Successful");
                      navig.push(window.location.href + "/summary");
                    }
                  },
                });
              } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
              }
            }}
          >
            Make Final Save
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

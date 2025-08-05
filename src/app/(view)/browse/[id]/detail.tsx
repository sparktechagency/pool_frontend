import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnyType } from "@/lib/config/error-type";
import { MailIcon, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BidForm from "./bid-form";
import { serverImageBuilder } from "@/lib/formatter";

export default function Details({ data }: { data: AnyType }) {
  return (
    <div className="w-1/2 mx-auto">
      {data.id}
      <h1 className="text-3xl text-center mt-6">Order Details</h1>
      <Image
        src={
          data?.photos[0]
            ? serverImageBuilder(data?.photos[0])
            : "/image/4e715d20e2d1e1d0581a8ea5248dc8c918ce46db.jpg"
        }
        height={1200}
        width={800}
        alt="image"
        className="aspect-video border rounded-xl w-full mx-auto my-12 object-contain"
      />
      <div className="p-4 font-semibold text-muted-foreground bg-secondary rounded-lg flex justify-center items-center">
        Order summery
      </div>
      <div className="grid grid-cols-2 gap-6 py-6">
        <p>Service:</p>
        <p>{data?.service}</p>

        <p>Request Date:</p>
        <p>{data?.date}</p>

        <p>Service Time:</p>
        <p>{data?.time}</p>

        <p>Location:</p>
        <p>{data?.address}</p>

        <p>Notes:</p>
        <p>{data?.describe_issue}</p>
      </div>
      <h1 className="text-3xl text-center my-6">Owners Information</h1>
      <div className="flex w-full flex-col justify-center items-center pb-12">
        <Avatar className="size-34">
          <AvatarImage
            src={
              serverImageBuilder(data?.user?.avatar) ??
              "/public/icon/play-store.png"
            }
          />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl mt-6 font-semibold">{data?.user?.full_name}</h2>
        <p className="flex items-center gap-1 text-xs mt-3">
          <MailIcon className="size-4" />
          {data?.user?.email}
        </p>
        <p className="flex items-center gap-1 text-xs mt-3">
          <MapPin className="size-4" />
          {data?.user?.location ?? "N/A"}
        </p>
      </div>
      <div className="bg-secondary p-6 rounded-lg grid grid-cols-2 gap-6">
        <div className="">
          <h4 className="text-muted-foreground">Completed services</h4>
          <p>{data?.user.profile?.completed_services}</p>
        </div>
        <div className="">
          <h4 className="text-muted-foreground">Canceled order</h4>
          <p>25</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4 my-6">
        <Button variant={"outline"} className="rounded-full">
          Accept Budget
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full">Start bidding</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add your bid price</DialogTitle>
            </DialogHeader>
            <BidForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="my-12">
        <h3 className="text-xl font-semibold">Payment Info</h3>
        <p>
          Your payment will be held securely in escrow and only released after
          the job is completed.
        </p>
      </div>
    </div>
  );
}

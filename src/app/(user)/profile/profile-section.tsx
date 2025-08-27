/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfileApi } from "@/lib/api/auth/auth";
import {
  BanknoteX,
  PackageIcon,
  ReceiptTextIcon,
  RocketIcon,
} from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";
import { serverImageBuilder } from "@/lib/formatter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ConnectStripe from "../connect-stripe";

export default async function ProfileSec() {
  const token = (await cookies()).get("ghost")?.value;
  const call: AnyType = await getProfileApi(token as string);
  const user = call?.data;
  return (
    <section className="mx-auto! w-2/3 space-y-4!">
      <h1 className="text-4xl font-semibold">Hello, {user.full_name}</h1>
      <p className="w-2/3">
        From your account dashboard. you can easily check & view your{" "}
        <Link href={"/"} className="text-accent-foreground font-semibold">
          Recent Orders
        </Link>
        , manage your{" "}
        <Link href={"/"} className="text-accent-foreground font-semibold">
          Shipping and Billing Addresses
        </Link>{" "}
        and edit your{" "}
        <Link href={"/"} className="text-accent-foreground font-semibold">
          Password
        </Link>{" "}
        and{" "}
        <span className="text-accent-foreground font-semibold">
          Account Details
        </span>{" "}
        .
      </p>
      {user.role === "PROVIDER" && !user.stripe_account_id && (
        <div className="w-full">
          <Alert variant="destructive" className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <BanknoteX className="h-5 w-5 mt-0.5" />
              <div>
                <AlertTitle className="font-semibold">
                  Payment Disabled
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">
                  You cannot accept payments until you connect your Stripe
                  account.
                </AlertDescription>
              </div>
            </div>

            <div className="flex justify-end w-full">
              <ConnectStripe />
            </div>
          </Alert>
        </div>
      )}
      <div className="w-full grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>ACCOUNT INFO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <Avatar className="!size-18">
                <AvatarImage src={serverImageBuilder(user.avatar)} />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div className="">
                <h4 className="text-xl font-bold">{user.full_name}</h4>
                <p>{user.location ?? "N/A"}</p>
              </div>
            </div>
            <div className="mt-6! space-y-3!">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="hidden">
                <span className="font-semibold">Sec Email:</span>{" "}
                kevin12345@gmail.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {user.contact_number ?? "N/A"}
              </p>
            </div>
            <Button variant="outline" size="lg" className="mt-6!" asChild>
              <Link href="/profile/edit">Edit Account</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b">
            <CardTitle>BILLING ADDRESS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="">
                <h4 className="text-xl font-bold">{user.full_name}</h4>
                <p className="text-muted-foreground">{user.address ?? "N/A"}</p>
              </div>
            </div>
            <div className="mt-6! space-y-3!">
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {user.contact_number ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {user.email ?? "N/A"}
              </p>
            </div>
            <Button variant="outline" size="lg" className="mt-6!" asChild>
              <Link href={`profile/address`}>Edit Address</Link>
            </Button>
          </CardContent>
        </Card>
        <div className="w-full h-full grid grid-rows-3 gap-6">
          <Card className="bg-blue-200 border-none">
            <CardContent className="flex gap-3">
              <div className="p-4! rounded-lg bg-background">
                <RocketIcon className="text-blue-500" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-semibold">
                  {call.total_order ?? "N/A"}
                </h3>
                <p>Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-amber-100 border-none">
            <CardContent className="flex gap-3">
              <div className="p-4! rounded-lg bg-background">
                <ReceiptTextIcon className="text-amber-500" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-semibold">
                  {call.pending_order ?? "N/A"}
                </h3>
                <p>Pending Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-100 border-none">
            <CardContent className="flex gap-3">
              <div className="p-4! rounded-lg bg-background">
                <PackageIcon className="text-green-500" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-semibold">
                  {call.completed_order ?? "N/A"}
                </h3>
                <p>Completed Orders</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

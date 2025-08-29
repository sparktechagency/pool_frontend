import React from "react";
import { viewUserApi } from "@/lib/api/admin/admin";
import { cookies } from "next/headers";
import { AnyType } from "@/lib/config/error-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { serverImageBuilder } from "@/lib/formatter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartBigIcon, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default async function User({ user }: { user: string }) {
  const token = (await cookies()).get("ghost")?.value;
  const data: AnyType = await viewUserApi(user, token ?? "");
  if (!data || !data.status) {
    return (
      <div className="bg-background shadow rounded-lg p-6">
        failed to load data
      </div>
    );
  }
  const profile = data?.user;
  return (
    <>
      <div className="bg-background shadow rounded-lg p-6 flex flex-col justify-center items-center gap-6">
        <Avatar className="size-24">
          <AvatarImage src={serverImageBuilder(profile.avatar)} />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl font-semibold">{profile.full_name}</h3>
        <p>Location: {[profile.profile.country ?? "N/A"]}</p>
        <p>{profile.email}</p>
        <div className="grid grid-cols-2 gap-6 w-full">
          <Card>
            <CardHeader className="space-y-2">
              <div className="p-4 text-muted-foreground rounded-full bg-secondary w-fit">
                <ShoppingBag />
              </div>
              <CardTitle>Completed services</CardTitle>
              <p className="font-semibold text-4xl">
                {profile.profile.completed_services}
              </p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="space-y-2">
              <div className="p-4 text-muted-foreground rounded-full bg-secondary w-fit">
                <BarChartBigIcon />
              </div>
              <CardTitle>Total Earnings</CardTitle>
              <p className="font-semibold text-4xl">
                ${profile.profile.total_earnings}
              </p>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Card className="bg-background shadow rounded-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Home owners list who buy service</CardTitle>
          <Button variant={"link"} className="underline text-blue-500">
            View all
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.transactions > 0 ? (
                data.transactions.map((x: AnyType) => (
                  <TableRow key={x.id}>
                    <TableCell className="">
                      <Avatar>
                        <AvatarImage src={serverImageBuilder("")} />
                      </Avatar>
                      <p></p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No transactions made
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

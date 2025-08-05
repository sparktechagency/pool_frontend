import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BrandTable() {
  const customers = [
    {
      name: "Ali Hasan",
      email: "alihasan@example.com",
      role: "Home Owner",
      avatarSrc: "https://avatar.iran.liara.run/public/1",
    },
    {
      name: "Liam Carter",
      email: "liamcarter@example.com",
      role: "Provider",
      avatarSrc: "https://avatar.iran.liara.run/public/2",
    },
    {
      name: "Savannah Nguyen",
      email: "savannahnguyen@example.com",
      role: "Home Owner",
      avatarSrc: "https://avatar.iran.liara.run/public/3",
    },
    {
      name: "Noah Thompson",
      email: "noahthompson@example.com",
      role: "Provider",
      avatarSrc: "https://avatar.iran.liara.run/public/4",
    },
    {
      name: "Olivia Davis",
      email: "oliviadavis@example.com",
      role: "Home Owner",
      avatarSrc: "https://avatar.iran.liara.run/public/5",
    },
  ];

  return (
    <Table>
      <TableHeader className="bg-none">
        <TableRow>
          <TableHead className="w-[100px] text-center">Owner Name</TableHead>
          <TableHead className="text-center">Service Name</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarImage src={customer.avatarSrc} />
                <AvatarFallback>
                  {customer.name.charAt(0)}
                  {customer.name.split(" ")[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center items-start h-full">
                <h4 className="">{customer.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {customer.email}
                </p>
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex items-center gap-2 pl-[25%]!">
                <div className="size-12 bg-amber-200 rounded-lg"></div>
                <div className="flex flex-col justify-center items-start h-full">
                  <h4 className="">{customer.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {customer.email}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">$123.00</TableCell>
            <TableCell className="text-center !space-x-2">
              <Button variant="ghost" className="text-blue-500" size="icon">
                <EyeIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

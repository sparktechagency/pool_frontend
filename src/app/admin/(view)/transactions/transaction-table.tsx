import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TransactionTable() {
  const transactions = [
    {
      date: "02 Feb, 2024",
      name: "Richardo Mathew",
      serviceName: "Need a cleaner for room...",
      amount: "$6729.00",
      status: "Completed",
    },
    {
      date: "02 Feb, 2024",
      name: "John Smith",
      serviceName: "Need a cleaner for room...",
      amount: "$6729.00",
      status: "Completed",
    },
    {
      date: "02 Feb, 2024",
      name: "D. Bravo",
      serviceName: "Need a cleaner for room...",
      amount: "$6729.00",
      status: "Pending", // Typo in image, assuming "Completed"
    },
    {
      date: "02 Feb, 2024",
      name: "Maxwell",
      serviceName: "Need a cleaner for room...",
      amount: "$6729.00",
      status: "Pending", // Typo in image, assuming "Completed"
    },
    {
      date: "02 Feb, 2024",
      name: "Maxwell",
      serviceName: "Need a cleaner for room...",
      amount: "$6729.00",
      status: "Pending", // Typo in image, assuming "Completed"
    },
    {
      date: "02 Feb, 2024",
      name: "Maxwell",
      serviceName: "Need a cleaner for room...",
      amount: "$6729.00",
      status: "Pending", // Typo in image, assuming "Completed"
    },
    {
      date: "02 Feb, 2024",
      name: "Maxwell",
      serviceName: "Need a cleaner for room...",
      amount: "$6729.00",
      status: "Pending", // Typo in image, assuming "Completed"
    },
  ];

  return (
    <Table>
      <TableHeader className="">
        <TableRow className="font-bold">
          <TableHead className="w-[120px] text-left">Date</TableHead>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-left">Service name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {transactions.map((transaction, index) => (
          <TableRow
            key={index}
            className="border-0! border-t-[24px]! border-transparent!"
          >
            <TableCell className="font-medium text-left">
              {transaction.date}
            </TableCell>
            <TableCell className="text-left font-semibold">
              {transaction.name}
            </TableCell>
            <TableCell className="text-left">
              {transaction.serviceName}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {transaction.amount}
            </TableCell>
            <TableCell className="text-center">
              <Badge
                className={`rounded-full text-xs font-semibold ${
                  transaction.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700" // Assuming "Competed" is meant to be a different status or a typo for "Completed"
                }`}
              >
                {transaction.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

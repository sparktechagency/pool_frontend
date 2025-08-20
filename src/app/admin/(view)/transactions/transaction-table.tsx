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
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getTransactionApi } from "@/lib/api/admin/admin";
import { AnyType } from "@/lib/config/error-type";

export default function TransactionTable({ token }: { token: string }) {
  const [page, setPage] = useState(1);

  const { data, isPending, isError }: AnyType = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => getTransactionApi(page, token),
  });
  if (!token) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        Token not found
      </div>
    );
  }
  const transactions: AnyType = data?.all_transactions?.data || [];

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="w-[140px] text-left">Date</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Service name</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isPending && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          )}

          {isError && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-red-500">
                Failed to load transactions
              </TableCell>
            </TableRow>
          )}

          {!isPending && transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No transactions found
              </TableCell>
            </TableRow>
          )}

          {transactions.map((transaction: AnyType) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium text-left">
                {new Date(transaction.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-left font-semibold">
                {transaction.name}
              </TableCell>
              <TableCell className="text-left">
                {transaction.service_name}
              </TableCell>
              <TableCell className="text-right font-semibold">
                ${parseFloat(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={`rounded-full text-xs font-semibold ${
                    transaction.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {data?.data?.total > data?.data?.per_page && (
        <div className="flex items-center justify-between pt-4">
          <button
            disabled={!data.data.prev_page_url}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {data.data.last_page}
          </span>
          <button
            disabled={!data.data.next_page_url}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

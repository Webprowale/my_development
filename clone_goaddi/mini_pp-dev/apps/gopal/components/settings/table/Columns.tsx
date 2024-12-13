"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowsDownUp } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillingType = {
  invoice: string | number;
  amount: string;
  date: string;
  status: string;
  user: string | number;
  action: string;
};

export const TableColumns: ColumnDef<BillingType>[] = [
  {
    accessorKey: "invoice",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center flex-shrink-0 cursor-pointer gap-1 rounded-l-md"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Inovice
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Amount
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Date
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Status
        </span>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          User
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer rounded-r-md"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Action
        </span>
      );
    },
  },
];

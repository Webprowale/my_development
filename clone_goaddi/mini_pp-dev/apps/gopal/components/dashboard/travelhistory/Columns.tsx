"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowsDownUp } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Travel = {
  no: string | number;
  airline: string;
  class: string;
  destination: string;
  departure: string;
  arrival: string;
  type: string;
  amount: string;
};

export const TableColumns: ColumnDef<Travel>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer gap-1"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          No
          <ArrowsDownUp size={16} />
        </span>
      );
    },
  },
  {
    accessorKey: "airline",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Airline
          <ArrowsDownUp size={16} />
        </span>
      );
    },
  },
  {
    accessorKey: "class",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Class
          <ArrowsDownUp size={16} />
        </span>
      );
    },
  },
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Destination
          <ArrowsDownUp size={16} />
        </span>
      );
    },
  },
  {
    accessorKey: "departure",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Departure
          <ArrowsDownUp size={16} />
        </span>
      );
    },
  },
  {
    accessorKey: "arrival",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Arrival
          <ArrowsDownUp size={16} />
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Type
          <ArrowsDownUp size={16} />
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
          <ArrowsDownUp size={16} />
        </span>
      );
    },
  },
];

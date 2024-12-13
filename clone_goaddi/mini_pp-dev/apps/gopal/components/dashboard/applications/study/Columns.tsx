"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DotsThree, PencilSimpleLine, XSquare } from "@phosphor-icons/react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ActiveBookings = {
  sn: number;
  dateSubmitted: string;
  appId: string;
  email: string;
  schoolName: string;
  cons: string;
  status: "cancelled";
  actions: "pay_now | view ";
};

export const ActiveBookingsColumns: ColumnDef<ActiveBookings>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
  },
  {
    accessorKey: "appId",
    header: "Application ID",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "schoolName",
    header: "School Name",
  },
  {
    accessorKey: "cons",
    header: "Consultation Generated",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href="" className="underline text-[#0D6EFD]">
        Pay Now
      </Link>
    ),
  },
];

const statusStyle = (status: string) => {
  if (status === "cancelled") {
    return "text-primary900 bg-primary100";
  } else if (status === "pending") {
    return "bg-[#FEF6E7] text-[#865503]";
  } else if (status === "refunded") {
    return "bg-[#E7F6EC] text-[#036B26]";
  } else if (status === "non-refundable" || status === "non refundable") {
    return "bg-[#FBEAE9] text-[#9E0A05]";
  }
};

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
  name: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  totalCost: number | string;
  actions: string;
};

export const ActiveBookingsColumns: ColumnDef<ActiveBookings>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Hotel Name",
  },
  {
    accessorKey: "destination",
    header: "Destinations",
  },
  {
    accessorKey: "checkIn",
    header: "Check-In Date",
  },
  {
    accessorKey: "checkOut",
    header: "Check-Out Date",
  },
  {
    accessorKey: "roomType",
    header: "Room Type",
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DotsThree size={25} weight="bold" className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={"#"}
              className="flex items-center gap-2 p-2 rounded text-sm"
            >
              <PencilSimpleLine size={18} />
              <span>Edit Details</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={"#"}
              className="flex items-center gap-2 p-2 rounded text-sm"
            >
              <XSquare size={18} />
              <span>Cancel Bookings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export type PastBookings = {
  sn: number;
  name: string;
  destination: string;
  date: string;
  duration: string;
  participant: string;
  totalCost: number | string;
};

export const PastBookingColumns: ColumnDef<PastBookings>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Activity Name",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "date",
    header: "Activity Date",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "participant",
    header: "Total Participant",
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
  },
];

export type CancelledBookings = {
  sn: number;
  name: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  cancelDate: number | string;
  status: "cancelled" | "pending" | "refunded" | "non-refundable";
};

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

export const CancelledBookingsColumn: ColumnDef<CancelledBookings>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Hotel Name",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "checkIn",
    header: "Check-In Date",
  },
  {
    accessorKey: "checkOut",
    header: "Check-Out Date",
  },
  {
    accessorKey: "roomType",
    header: "Room Type",
  },
  {
    accessorKey: "cancelDate",
    header: "Cancellation Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`font-medium p-2 capitalize rounded ${statusStyle(row.getValue("status"))}`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
];

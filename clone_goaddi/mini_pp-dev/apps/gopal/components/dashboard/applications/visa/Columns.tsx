import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export type VisaBookings = {
  sn: number;
  date: string;
  id: string;
  country: string;
  destination: string;
  consult: string;
  status: "pending" | "contacted" | "invoiced" | "kanban board";
  action: string;
};

export const VisaBookingsColumns: ColumnDef<VisaBookings>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "date",
    header: "Date Submitted",
  },
  {
    accessorKey: "id",
    header: "Application ID",
  },
  {
    accessorKey: "country",
    header: "Nationality",
  },
  {
    accessorKey: "destination",
    header: "Destination Country",
  },
  {
    accessorKey: "country",
    header: "Nationality",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <>
        {row.getValue("action") === "pending" && <span>-</span>}
        {row.getValue("action") === "contacted" && <span>-</span>}
        {row.getValue("action") === "invoiced" && (
          <Link
            href={`/gopal/dashboard/applications?tab=${useSearchParams().get("tab")}&invoice=APP-123`}
            className="text-primary600 underline underline-offset-2 font-medium"
          >
            Pay Now
          </Link>
        )}
        {row.getValue("action") === "kanban" && (
          <Link
            href={"/gopal/dashboard/applications/5/status"}
            className="text-primary600 underline underline-offset-2 font-medium"
          >
            View Status
          </Link>
        )}
      </>
    ),
  },
];

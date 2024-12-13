"use client";

import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const BillingTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  // @ts-ignore
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <section className="billing-table mt-20 mb-10">
      <header className="flex items-center justify-between mb-8">
        <h2 className="font-medium">Billing History</h2>

        <div className="search relative w-[250px]">
          <input
            type="text"
            id="billing-search"
            className="w-full rounded min-h-[40px] text-[#667185] bg-[#F0F2F5] pl-10 text-sm"
            placeholder="Search"
            value={
              (table.getColumn("invoice")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("invoice")?.setFilterValue(event.target.value)
            }
          />
          <MagnifyingGlass
            size={22}
            className="absolute top-[50%] left-2 text-[#667185] translate-y-[-50%]"
          />
        </div>
      </header>

      {/* Billing Table */}
      <div className="table w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-[#00004A] text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="w-full h-24 text-center min-h-[500px]  py-20"
                >
                  <Image
                    src={"/assets/bill-table-empty.svg"}
                    width={139}
                    height={139}
                    alt=""
                    className="inline-block mx-auto "
                  />
                  <p className="text-sm text-center mt-3 font-medium">
                    No bills yet.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default BillingTable;

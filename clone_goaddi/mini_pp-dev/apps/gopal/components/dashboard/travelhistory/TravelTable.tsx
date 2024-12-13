import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  headerTitle: string;
}

export function TravelTable<TData, TValue>({
  columns,
  data,
  headerTitle,
}: DataTableProps<TData, TValue>) {
  // @ts-ignore
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
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
    <section className="  ">
      <header className="flex items-center justify-between mb-6">
        <h2 className="font-medium">{headerTitle}</h2>

        <div className="table-actions flex items-center gap-2">
          <div className="hidden md:block search relative">
            {/* <input type="text" id="search" placeholder="Search" /> */}
            <Input
              className="pl-7 text-[#667185] focus-within:outline-none focus:outline-none focus-within:border-primary600 focus-visible:ring-transparent"
              placeholder="Search"
              value={
                (table.getColumn("airline")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("airline")?.setFilterValue(event.target.value)
              }
            />
            <MagnifyingGlass
              size={18}
              className="absolute left-2 text-[#667185] top-[50%] translate-y-[-50%]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-2 px-4 border rounded hover:bg-gray-100">
              <SlidersHorizontal size={15} />
              Filter
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Class</DropdownMenuItem>
              <DropdownMenuItem>Type</DropdownMenuItem>
              <DropdownMenuItem>Amount</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href={"#"}
            className="hidden md:inline-block text-[14px] rounded py-2 px-8 bg-primary600 hover:bg-primary700 ease duration-150 text-white"
          >
            See All
          </Link>
        </div>
      </header>

      {/* <section className=""></section> */}
      <div className="rounded-md border w-full ">
        <Table className="overflow-scroll ">
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
                            header.getContext()
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
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="table-footer flex items-center justify-between mt-4">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </section>
  );
}

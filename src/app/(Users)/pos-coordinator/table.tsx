"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckInAction, CheckOutAction } from "./component/table-action";
import { useGetAllSchedule } from "./query";
import { Visit } from "@/types/types";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ScheduleType = {
  id: string;
  date: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  location: string;
};

export const columns: ColumnDef<ScheduleType>[] = [
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <div className=" ">
          <Button
            variant="ghost"
            className="pl-0 "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Partner Name
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize bg-secondary w-max rounded py-1 px-4">
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Schedule</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = format(date, "dd-MM-yyyy/HH:mm");

      return <div className="capitalize">{formattedDate}</div>;
    },
  },

  {
    id: "checkInActions",
    enableHiding: false,
    cell: ({ row }) => {
      const schedule = row.original;

      if (schedule.status === "IN_PROGRESS") {
        return (
          <div className="inline-flex items-center justify-center gap-2  rounded-md bg-secondary   h-7 px-4 py-0">
            <p className="text-green-900">Visiting..</p>
          </div>
        );
      }

      return <CheckInAction schedule={schedule} />;
    },
  },

  {
    id: "checkOutActions",
    enableHiding: false,
    cell: ({ row }) => {
      const Schedule = row.original;

      return Schedule.status === "IN_PROGRESS" ? (
        <CheckOutAction schedule={Schedule} />
      ) : null;
    },
  },
];

export function PosCoordinatorSchedules() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { data: schedules, isLoading, isError } = useGetAllSchedule();
  if (isLoading) {
    console.log("loading................................................");
  }

  if (isError) {
    console.log("error................................................");
  }

  const data: Visit[] = schedules ? schedules : [];

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div className="lg:w-[80%] lg:mx-auto">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Partners..."
          value={
            (table.getColumn("location")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("location")?.setFilterValue(event.target.value)
          }
          className=" sm:max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

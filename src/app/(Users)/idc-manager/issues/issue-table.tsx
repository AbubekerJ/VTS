"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
import { useGetAllVisitIssues } from "../query";
import { format } from "date-fns";

import IssueTableAction from "./issue-table-action";

export type IssueType = {
  visitId: string;
  issueId: string;
  createdBy: string;
  partner: string;
  issue: string;
  status: string;
  createdDate: string | undefined;
};

export const columns: ColumnDef<IssueType>[] = [
  {
    accessorKey: "partner",
    header: ({ column }) => {
      return (
        <div className=" ">
          <Button
            variant="ghost"
            className="pl-0"
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
        {row.getValue("partner")}
      </div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: () => <div className="text-left ">Logged By</div>,
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("createdBy")}</div>
    ),
  },

  {
    accessorKey: "issue",
    header: () => <div className="text-left ">Issue</div>,
    cell: ({ row }) => (
      <div className="capitalize  w-max text-destructive p-2 bg-secondary px-4 py-1">
        {row.getValue("issue")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const textColor = status === "SOLVED" ? "text-green-500" : "text-red-500";

      return (
        <div className={`capitalize w-max p-2 px-4 py-1  ${textColor}`}>
          {status.replaceAll("_", " ")}
        </div>
      );
    },
  },

  {
    accessorKey: "createdDate",
    header: () => <div className="text-left">Created Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdDate"));
      const formattedDate = format(date, "dd-MM-yyyy");
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const issue = row.original;

      return <IssueTableAction issue={issue} />;
    },
  },
];

export function IssueTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { data: issues, isLoading, isError } = useGetAllVisitIssues();
  if (isLoading) {
    console.log("loading................................................");
  }

  if (isError) {
    console.log("error................................................");
  }

  const data: IssueType[] = issues ? issues : [];

  console.log(
    "data..............payload ........................................",
    data
  );

  const [rowSelection, setRowSelection] = React.useState({});

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
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="lg:w-[95%] lg:mx-auto">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Partners..."
          value={(table.getColumn("partner")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("partner")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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

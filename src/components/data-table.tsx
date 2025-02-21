/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useQuery } from "@tanstack/react-query";

export function DataTable<T>({
  columns,
  dataProvider,
  externalParams,
  datePicker,
  filterColumnId,
  queryKey,
}: {
  columns: ColumnDef<T>[];
  dataProvider: (params: any) => void;
  externalParams?: { [key: string]: any };
  datePicker?: React.ReactNode;
  filterColumnId?: string;
  queryKey?: string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, externalParams],
    queryFn: () => {
      const data = dataProvider(externalParams);
      return data;
    },
  });
  const memorizedData = React.useMemo(() => data ?? [], [data]);
  if (isLoading) {
    console.log("loading");
  }

  if (isError) {
    console.log("error");
  }

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: memorizedData,
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

  // // const queryOptions = {
  // //   columnFilters,
  // //   sorting,
  //     selectedDateRange
  // // };

  return (
    <div className="lg:w-[95%] lg:mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          {filterColumnId && (
            <Input
              placeholder={`Filter ${filterColumnId ?? ""}...`}
              value={
                (table
                  .getColumn(filterColumnId ?? "")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterColumnId ?? "")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )}
        </div>
        {datePicker && datePicker}
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

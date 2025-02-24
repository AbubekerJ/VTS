/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, File } from "lucide-react";
import { DataTableToolbar } from "./data-table-tool-bar";
import { DataTablePagination } from "./data-table-pagination";

export function DataTable<T>({
  columns,
  dataProvider,
  externalParams,
  datePicker,
  filterColumnId,
  queryKey,
  columnVisibilityFunctionality,
  facetedFilter,
  onExport,
}: {
  columns: ColumnDef<T>[];
  dataProvider: (params: any) => void;
  externalParams?: { [key: string]: any };
  datePicker?: React.ReactNode;
  filterColumnId?: string;
  queryKey?: string;
  columnVisibilityFunctionality?: boolean;
  facetedFilter?: boolean;
  onExport?: () => Promise<void>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
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
        <div className="flex items-center py-4 gap-2">
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
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <div className="flex gap-1 items-center">
                <File />
                Export
              </div>
            </Button>
          )}
          {facetedFilter && <DataTableToolbar table={table} />}
          {columnVisibilityFunctionality && (
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
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

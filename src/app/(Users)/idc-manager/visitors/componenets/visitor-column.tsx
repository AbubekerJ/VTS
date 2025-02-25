import { ColumnDef } from "@tanstack/react-table";
import { Visitor } from "../visitor-controller";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const columns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="name" />;
    },
    cell: ({ row }) => (
      <div className="capitalize bg-secondary w-max rounded py-1 px-4">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: () => <div className="text-left ">Email</div>,
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("email")}</div>
    ),
  },

  {
    accessorKey: "visitsCount",
    header: () => <div className="text-left ">Visit Count</div>,
    cell: ({ row }) => (
      <div className="capitalize bg-green-50 px-3 p-1 w-max text-green-900 rounded ">
        {row.getValue("visitsCount")} Completed
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const visitor = row.original;
      console.log("row");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                console.log(
                  "schedule id.................................",
                  visitor.id
                )
              }
            >
              <p className="capitalize text-red-500 cursor-pointer">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

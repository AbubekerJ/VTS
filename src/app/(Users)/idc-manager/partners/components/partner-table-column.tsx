import { ColumnDef } from "@tanstack/react-table";
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

type partnerProps = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export const columns: ColumnDef<partnerProps>[] = [
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
    accessorKey: "latitude",
    header: () => <div className="text-left ">Latitude</div>,
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("latitude")}</div>
    ),
  },
  {
    accessorKey: "longitude",
    header: () => <div className="text-left ">Longitude</div>,
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("longitude")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const partner = row.original;
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
                  partner.id
                )
              }
            >
              <p className="capitalize text-red-500 cursor-pointer">Edit</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

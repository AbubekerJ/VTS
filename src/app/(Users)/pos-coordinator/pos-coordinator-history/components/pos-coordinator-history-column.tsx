import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type ScheduleType = {
  id: string;
  completedDate: string | null;
  location: string;
  issues: number;
};

export const columns: ColumnDef<ScheduleType>[] = [
  {
    accessorKey: "location",
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
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "completedDate",
    header: () => <div className="text-left ">Completed</div>,
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("completedDate")}</div>
    ),
  },

  {
    accessorKey: "issues",
    header: () => <div className="text-left ">Issue</div>,
    cell: ({ row }) => (
      <div className="capitalize  w-max text-destructive p-2 bg-secondary px-4 py-1">
        {row.getValue("issues")} issues
      </div>
    ),
  },
];

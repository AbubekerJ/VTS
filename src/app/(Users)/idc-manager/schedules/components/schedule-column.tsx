import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ScheduleType } from "../schedule-controller";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RescheduleAction } from "./reschedule-table-action";
import { format } from "date-fns";

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
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const textColor =
        status === "SCHEDULED"
          ? "text-blue-800  bg-blue-50 py-1 px-3 w-max  "
          : "text-yellow-500  bg-yellow-50 py-1 px-3 w-max ";

      const formattedStatus = status.replace(/_/g, " ").toLowerCase();

      return <div className={`${textColor}`}>{formattedStatus}</div>;
    },
  },

  {
    accessorKey: "date",
    header: () => <div className="text-left">Schedule</div>,

    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = format(date, "dd-MM-yyyy/ hh:mm ");

      return <div className="capitalize">{formattedDate}</div>;
    },
  },

  {
    accessorKey: "AssignedVisitor",
    header: () => <div className="text-left ">Assigned To</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("AssignedVisitor")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const schedule = row.original;
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
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <RescheduleAction scheduleId={schedule.id} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                console.log(
                  "schedule id.................................",
                  schedule.id
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

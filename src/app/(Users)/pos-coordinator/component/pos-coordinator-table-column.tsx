import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { CheckInAction, CheckOutAction } from "./table-action";

export type PosCoordinatorTableProps = {
  id: string;
  date: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  location: string;
};

export const columns: ColumnDef<PosCoordinatorTableProps>[] = [
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

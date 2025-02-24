"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IssueType } from "../issue-controller";
import IssueTableAction from "./issue-table-action";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { statuses } from "@/components/data-table/data";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IssueType>[] = [
  {
    accessorKey: "partner",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="partner" />;
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
    header: () => <div className="text-left">Issue</div>,
    cell: ({ row }) => {
      const issue = row.getValue("issue") as string;

      const isNoIssue = issue === "No issues found";

      return (
        <div
          className={`capitalize w-max p-2 px-4 py-1 ${
            isNoIssue
              ? "text-gray-500 bg-gray-200"
              : "text-destructive bg-secondary"
          }`}
        >
          {issue}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="status" />;
    },
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      const textColor =
        status.value === "SOLVED"
          ? "text-green-500"
          : status.value === "NOT_SOLVED"
          ? "text-red-500"
          : "text-gray-500";

      return (
        <div className={`capitalize w-max p-2 px-4 py-1 ${textColor}`}>
          <Badge variant={"secondary"} className={`capitalize ${textColor}`}>
            {status.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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

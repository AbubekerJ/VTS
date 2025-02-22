"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IssueType } from "../issue-controller";
import { ArrowUpDown } from "lucide-react";
import IssueTableAction from "./issue-table-action";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<IssueType>[] = [
  {
    accessorKey: "partner",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="partner" />

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
    header: ({column}) => {
      return (
        <DataTableColumnHeader column={column} title="status" />
      )
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      const textColor =
        status === "SOLVED"
          ? "text-green-500"
          : status === "NOT_SOLVED"
          ? "text-red-500"
          : "text-gray-500";

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

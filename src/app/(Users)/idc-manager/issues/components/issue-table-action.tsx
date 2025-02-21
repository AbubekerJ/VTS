import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateIssuesStatus } from "../../query";
import { useToast } from "@/hooks/use-toast";
import { VisitLogModal } from "./visit-log-card";

interface Issue {
  issueId: string;
  visitId: string;
  visitLog: string;
}

const IssueTableAction = ({ issue }: { issue: Issue }) => {
  const { mutate: updateIssue } = useUpdateIssuesStatus();
  const { toast } = useToast();
  const updateIssueStatus = (
    issueId: string,
    visitId: string,
    status: "NOT_SOLVED" | "SOLVED"
  ) => {
    console.log("payload...............................", {
      issueId,
      visitId,
      status,
    });
    updateIssue(
      { issueId, visitId, status },
      {
        onSuccess: () => {
          toast({
            title: `Issue status updated to ${status}`,
          });
        },
      }
    );
  };
  const [showLog, setShowLog] = useState(false);
  const handleShowLog = () => {
    setShowLog(true);
  };
  const handleHideLog = () => {
    setShowLog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleShowLog}>
            <p className="capitalize  cursor-pointer ">View Logs</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              updateIssueStatus(issue.issueId, issue.visitId, "SOLVED")
            }
          >
            <p className="capitalize  cursor-pointer ">Solved</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              updateIssueStatus(issue.issueId, issue.visitId, "NOT_SOLVED")
            }
          >
            <p className="capitalize  cursor-pointer  ">Not Solved</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <VisitLogModal
        open={showLog}
        onClose={handleHideLog}
        visitLog={issue.visitLog}
      />
    </>
  );
};

export default IssueTableAction;

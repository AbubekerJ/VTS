import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateIssuesStatus } from "../query";
import { useToast } from "@/hooks/use-toast";

interface Issue {
  issueId: string;
  visitId: string;
}

const IssueTableAction = ({ issue }: { issue: Issue }) => {
  const { mutate: updateIssue } = useUpdateIssuesStatus();
  const { toast } = useToast();
  // console.log("issue props........................................", issue);
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
            description: `Issue status updated to ${status}`,
          });
        },
      }
    );
  };
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
        <DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              updateIssueStatus(issue.issueId, issue.visitId, "SOLVED")
            }
          >
            <p className="capitalize  cursor-pointer">Solved</p>
          </DropdownMenuItem>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            updateIssueStatus(issue.issueId, issue.visitId, "NOT_SOLVED")
          }
        >
          <p className="capitalize  cursor-pointer">Not Solved</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IssueTableAction;

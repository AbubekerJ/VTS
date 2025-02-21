"use client";

import { DateRange } from "react-day-picker";
import { DataTable } from "../../../../components/data-table";
import { getAllVisitIssues } from "@/app/server/issues";
import { columns } from "./components/issue-table-column";
import { DatePickerWithRange } from "./components/date-range-picker";
import { useState } from "react";

export type IssueType = {
  visitId: string;
  visitLog: string;
  issueId: string;
  createdBy: string;
  partner: string;
  issue: string;
  status: string;
  createdDate: string | undefined;
};

export function IssueController() {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );
  return (
    <DataTable<IssueType>
      externalParams={selectedDate}
      dataProvider={getAllVisitIssues}
      columns={columns}
      datePicker={<DatePickerWithRange setSelectedDate={setSelectedDate} />}
      filterColumnId="partner"
      queryKey="issues"
    />
  );
}

"use client";

import { DateRange } from "react-day-picker";
import { DataTable } from "../../../../components/data-table/data-table";
import { getAllVisitIssues } from "@/app/server/issues";
import { columns } from "./components/issue-table-column";
import { DatePickerWithRange } from "./components/date-range-picker";
import { useState } from "react";
import { downloadToExcel } from "./components/xlsx";

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
    <div>
      <DataTable<IssueType>
        externalParams={selectedDate}
        dataProvider={getAllVisitIssues}
        columns={columns}
        datePicker={<DatePickerWithRange setSelectedDate={setSelectedDate} />}
        filterColumnId="partner"
        queryKey="issues"
        facetedFilter={true}
        onExport={async () =>
          downloadToExcel(await getAllVisitIssues(selectedDate))
        }
      />
    </div>
  );
}

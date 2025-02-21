"use client";

import * as React from "react";



import { DataTable } from "@/components/data-table";
import { getCompletedVisits } from "@/app/server/visits";
import { columns, ScheduleType } from "./components/pos-coordinator-history-column";

export function PosCoordinatorSchedulesHistory() {
  return (
    <DataTable<ScheduleType>
      columns={columns}
      dataProvider={getCompletedVisits}
      filterColumnId="location"
      queryKey="CompletedVisits"
    />
  );
}

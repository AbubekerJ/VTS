"use client";

import * as React from "react";

import { getPosCoordinatorVisits } from "@/app/server/visits";
import { DataTable } from "@/components/data-table/data-table";
import {
  columns,
  PosCoordinatorTableProps,
} from "./component/pos-coordinator-table-column";

export function PosCoordinatorSchedules() {
  return (
    <DataTable<PosCoordinatorTableProps>
      columns={columns}
      dataProvider={getPosCoordinatorVisits}
      queryKey="schedule"
      columnVisibilityFunctionality={true}
    />
  );
}

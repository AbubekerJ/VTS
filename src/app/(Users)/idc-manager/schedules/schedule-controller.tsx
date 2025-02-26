"use client";

import * as React from "react";

import { columns } from "./components/schedule-column";
import { DataTable } from "@/components/data-table/data-table";
import { getScheduledVisit } from "@/app/server/visits";
import { Button } from "@/components/ui/button";
import AddSchedule from "./components/add-schedule-form";

export type ScheduleType = {
  id: string;
  date: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  location: string;
  AssignedVisitor: string;
};

export function ScheduleController() {
  // State to manage dialog visibility
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true); // Open dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close dialog
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-center p-4   ">
        <div className="w-full md:w-auto mb-4 md:mb-0 sm:absolute top-0 right-4 sm:p-4">
          <Button onClick={handleDialogOpen}>Add Schedule</Button>
        </div>
        <div className="w-full">
          <div className="data-table-container">
            <DataTable<ScheduleType>
              dataProvider={getScheduledVisit}
              columns={columns}
              filterColumnId="location"
              queryKey="scheduledVisit"
            />
          </div>
        </div>
      </div>

      <AddSchedule open={openDialog} onClose={handleDialogClose} />
    </div>
  );
}

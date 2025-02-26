"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./componenets/visitor-column";
import { getVisitorUnderThisManager } from "@/app/server/pos-coordinators";
import AddVisitorForm from "./componenets/add-user-form";

export type Visitor = {
  id: string;
  name: string;
  email: string;
  visitsCount: number;
};

export function VisitorController() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-center p-4   ">
        <div className="w-full md:w-auto mb-4 md:mb-0 sm:absolute top-0 right-4 sm:p-4">
          <Button onClick={handleDialogOpen}>Add Visitor</Button>
        </div>
        <div className="w-full">
          <div className="data-table-container">
            <DataTable<Visitor>
              columns={columns}
              dataProvider={getVisitorUnderThisManager}
              queryKey="visitors"
              filterColumnId="name"
            />
          </div>
        </div>
      </div>

      <AddVisitorForm open={openDialog} onClose={handleDialogClose} />
    </div>
  );
}

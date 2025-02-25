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
    setOpenDialog(true); // Open dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close dialog
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-4 p-4 ">
        <Button onClick={handleDialogOpen}>Add Visitor</Button>
      </div>
      <DataTable<Visitor>
        columns={columns}
        dataProvider={getVisitorUnderThisManager}
        queryKey="visitors"
        filterColumnId="name"
      />
      <AddVisitorForm open={openDialog} onClose={handleDialogClose} />
    </div>
  );
}

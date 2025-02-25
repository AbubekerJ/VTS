"use client";

import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./partner-table-column";
import { getAllPartners } from "@/app/server/partners";
import { Button } from "@/components/ui/button";
import AddPartnerForm from "./add-partner-form";

const PartnerController = () => {
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
        <Button onClick={handleDialogOpen}>Add Partner</Button>
      </div>
      <DataTable
        columns={columns}
        dataProvider={getAllPartners}
        queryKey="partners"
        filterColumnId="name"
      />
      <AddPartnerForm open={openDialog} onClose={handleDialogClose} />
    </div>
  );
};

export default PartnerController;

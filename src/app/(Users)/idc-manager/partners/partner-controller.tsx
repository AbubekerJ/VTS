"use client";

import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./components/partner-table-column";
import { getAllPartners } from "@/app/server/partners";
import { Button } from "@/components/ui/button";
import AddPartnerForm from "./components/add-partner-form";

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
      <div className="flex flex-col md:flex-row justify-between items-center p-4   ">
        <div className="w-full md:w-auto mb-4 md:mb-0 sm:absolute top-0 right-4 sm:p-4">
          <Button onClick={handleDialogOpen}>Add Partner</Button>
        </div>
        <div className="w-full">
          <div className="data-table-container">
            <DataTable
              columns={columns}
              dataProvider={getAllPartners}
              queryKey="partners"
              filterColumnId="name"
            />
          </div>
        </div>
      </div>

      <AddPartnerForm open={openDialog} onClose={handleDialogClose} />
    </div>
  );
};

export default PartnerController;

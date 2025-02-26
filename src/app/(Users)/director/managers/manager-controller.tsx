"use client";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./components/manager-column";
import { getIdcManagers } from "@/app/server/idc-manager";
import AddManagerForm from "./components/add-manager-form";
import { Button } from "@/components/ui/button";

const ManagerController = () => {
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
          <Button onClick={handleDialogOpen}>Add Manager</Button>
        </div>
        <div className="w-full">
          <div className="data-table-container">
            <DataTable
              columns={columns}
              dataProvider={getIdcManagers}
              queryKey="managers"
              filterColumnId="name"
            />
          </div>
        </div>
      </div>

      <AddManagerForm open={openDialog} onClose={handleDialogClose} />
    </div>
  );
};

export default ManagerController;

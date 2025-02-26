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
      <div className="absolute top-0 right-4 p-4 ">
        <Button onClick={handleDialogOpen}>Add Manager</Button>
      </div>
      <DataTable
        columns={columns}
        dataProvider={getIdcManagers}
        queryKey="managers"
        filterColumnId="name"
      />
      <AddManagerForm open={openDialog} onClose={handleDialogClose} />
    </div>
  );
};

export default ManagerController;

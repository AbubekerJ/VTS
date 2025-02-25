"use client";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./components/manager-column";
import { getIdcManagers } from "@/app/server/idc-manager";

const ManagerController = () => {
  return (
    <div>
      <DataTable
        columns={columns}
        dataProvider={getIdcManagers}
        queryKey="manager"
        filterColumnId="name"
      />
    </div>
  );
};

export default ManagerController;

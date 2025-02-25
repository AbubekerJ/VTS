import React from "react";
import ManagerController from "./manager-controller";
import PageWrapper from "@/components/page-wrapper-card";

const Managers = () => {
  return (
    <div>
      <PageWrapper title="IDC Managers" description="All IDC managers">
        <ManagerController />
      </PageWrapper>
    </div>
  );
};

export default Managers;

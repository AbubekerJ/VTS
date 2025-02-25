import React from "react";
import { PosCoordinatorSchedules } from "./pos-coordinator-controller";

import PageWrapper from "@/components/page-wrapper-card";

const PosCoordinator = () => {
  return (
    <div className="p-4 lg:p-10 xl:p-30 py-10  ">
      <PageWrapper
        title="Your schedules"
        description=" Check in upon arrival at the location. After completing your visit,
            log a report and select any issues encountered from the list."
      >
        <PosCoordinatorSchedules />
      </PageWrapper>
    </div>
  );
};

export default PosCoordinator;

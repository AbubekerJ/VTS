import React from "react";
import { PosCoordinatorSchedulesHistory } from "./history-controller";

import PageWrapper from "@/components/page-wrapper-card";

const PosCoordinatorHistory = () => {
  return (
    <div className="p-4 lg:p-10 xl:p-30 py-10 ">
      <PageWrapper
        title="Your Visit history"
        description="  Review your past visits, including Issues encountered"
      >
        <PosCoordinatorSchedulesHistory />
      </PageWrapper>
    </div>
  );
};

export default PosCoordinatorHistory;

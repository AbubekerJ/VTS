import React from "react";
import { ScheduleController } from "./schedule-controller"; // import ScheduleCards from "./cards";

import PageWrapper from "@/components/page-wrapper-card";

const page = () => {
  return (
    <div className=" mx-auto my-10">
      <PageWrapper
        title="Visit Schedule"
        description=" Create new visit schedules Reschedule visits View upcoming visits
            including assigned visitors, dates, and statuses"
      >
        <ScheduleController />
      </PageWrapper>
    </div>
  );
};

export default page;

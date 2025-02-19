import React from "react";
import { ScheduleTable } from "./schedule-table";
import ScheduleCards from "./cards";

const page = () => {
  return (
    <div className=" mx-auto my-10">
      <div className="mb-10">
        <ScheduleCards />
      </div>
      <div>
        <ScheduleTable />
      </div>
    </div>
  );
};

export default page;

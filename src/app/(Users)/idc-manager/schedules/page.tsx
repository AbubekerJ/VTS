import React from "react";
import { ScheduleController } from "./schedule-controller"; // import ScheduleCards from "./cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className=" mx-auto my-10">
      <Card className="mx-auto w-[90%] mt-5">
        <CardHeader className="gap-4">
          <CardTitle>Visit Schedule</CardTitle>
          <CardDescription className="">
            Create new visit schedules Reschedule visits View upcoming visits
            including assigned visitors, dates, and statuses
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          {" "}
          <ScheduleController />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

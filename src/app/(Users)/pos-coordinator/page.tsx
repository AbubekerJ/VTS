import React from "react";
import { PosCoordinatorSchedules } from "./pos-coordinator-controller";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PosCoordinator = () => {
  return (
    <div className="p-4 lg:p-10 xl:p-30 py-10  ">
      <Card className="w-full ">
        <CardHeader className="gap-4">
          <CardTitle>Your schedules</CardTitle>
          <CardDescription>
            Check in upon arrival at the location. After completing your visit,
            log a report and select any issues encountered from the list.
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <PosCoordinatorSchedules />
        </CardContent>
      </Card>
    </div>
  );
};

export default PosCoordinator;

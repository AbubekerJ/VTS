import React from "react";
import { PosCoordinatorSchedulesHistory } from "./history-controller";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PosCoordinatorHistory = () => {
  return (
    <div className="p-4 lg:p-10 xl:p-30 py-10 ">
      <Card className=" w-full ">
        <CardHeader className="gap-4">
          <CardTitle>Your Visit history</CardTitle>
          <CardDescription>
            Review your past visits, including Issues encountered
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <PosCoordinatorSchedulesHistory />
        </CardContent>
      </Card>
    </div>
  );
};

export default PosCoordinatorHistory;

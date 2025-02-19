import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Loader } from "lucide-react";

const ScheduleCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:w-[80%] lg:justify-center lg:mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          <CalendarCheck className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">9</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In-Progress</CardTitle>
          <Loader className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleCards;

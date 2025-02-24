"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DatePickerWithRange } from "./components/date-range-picker";
import { RecentSales } from "./components/top-visitors";
import {
  CalendarCheck,
  CircleCheckBig,
  Footprints,
  OctagonAlert,
} from "lucide-react";
import { useGetNotSolvedIssueCount, useGetVisitCounts } from "../query";
import { IssueChart } from "./components/issue-chart";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );
  const { data: visits } = useGetVisitCounts(selectedDate);
  const { data: issues } = useGetNotSolvedIssueCount(selectedDate);

  return (
    <>
      <div className=" flex-col md:flex md:mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6 ">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-2">
              <DatePickerWithRange setSelectedDate={setSelectedDate} />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Scheduled
                    </CardTitle>
                    <CalendarCheck className="text-gray-400 h-5 w-5" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {visits?.scheduled}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      In Progress
                    </CardTitle>
                    <Footprints className="text-gray-400 h-5 w-5" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {visits?.inProgress}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completed
                    </CardTitle>
                    <CircleCheckBig className="text-gray-400 h-5 w-5" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {visits?.completed}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Not solved Issues
                    </CardTitle>
                    <OctagonAlert className="text-gray-400 h-5 w-5" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{issues || 0}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Issues</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <IssueChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Top visitors</CardTitle>
                    <CardDescription>Top 5 visitors </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { VisitorTable } from "./visitor-table";
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
    <Card className="mx-auto w-[90%] mt-5">
      <CardHeader className="gap-4">
        <CardTitle>Visitor Records</CardTitle>
        <CardDescription className="">
          List of visitors with their number of completed visits.
        </CardDescription>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent> {<VisitorTable />}</CardContent>
    </Card>
  );
};

export default page;

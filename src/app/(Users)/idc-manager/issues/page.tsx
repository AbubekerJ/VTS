"use client";
import React from "react";
import { IssueController } from "./issue-controller";
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
    <div>
      <Card className="mx-auto w-[90%] mt-5">
        <CardHeader className="gap-4">
          <CardTitle>Visit Issue Details</CardTitle>
          <CardDescription className="">
            Review reported issues for this visit, including status and assigned
            pos-coordinator.
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>{<IssueController />}</CardContent>
      </Card>
    </div>
  );
};

export default page;

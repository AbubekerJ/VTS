"use client";
import React from "react";
import { IssueController } from "./issue-controller";

import PageWrapper from "@/components/page-wrapper-card";
const page = () => {
  return (
    <div>
      <PageWrapper
        title="Visit Issue Details"
        description="Review reported issues for this visit, including status and assigned
            pos-coordinator."
      >
        <IssueController />
      </PageWrapper>
    </div>
  );
};

export default page;

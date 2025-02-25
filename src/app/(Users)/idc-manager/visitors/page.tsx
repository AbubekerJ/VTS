import React from "react";
import { VisitorController } from "./visitor-controller";

import PageWrapper from "@/components/page-wrapper-card";

const page = () => {
  return (
    <PageWrapper
      title="Visitor Records"
      description=" List of visitors with their number of completed visits."
    >
      <VisitorController />
    </PageWrapper>
  );
};

export default page;

import React from "react";
import PartnerController from "./partner-controller";

import PageWrapper from "@/components/page-wrapper-card";

const Partners = () => {
  return (
    <div>
      <PageWrapper
        title="Partners"
        description="List of partners in your region."
      >
        <PartnerController />
      </PageWrapper>
    </div>
  );
};

export default Partners;

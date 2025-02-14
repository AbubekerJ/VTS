import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CheckIn } from "./check-correct-location";
import { Visit } from "@/types/types";
import LogForm from "./log-form";
export const CheckOutAction = ({ schedule }: { schedule: Visit }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setShowEditForm(true)}>
        CheckOut
      </Button>
      <LogForm
        schedule={schedule}
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
      />
    </>
  );
};

export const CheckInAction = ({ schedule }: { schedule: Visit }) => {
  return <CheckIn schedule={schedule} />;
};

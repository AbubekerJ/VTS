import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CheckOutDialog } from "./checkout-dialog";
import { CheckIn } from "./check-correct-location";
import { ScheduleType } from "./table";

export const CheckOutAction = ({ schedule }: { schedule: ScheduleType }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <>
      <Button onClick={() => setShowEditForm(true)} className="bg-blue-500">
        CheckOut
      </Button>
      <CheckOutDialog
        schedule={schedule}
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
      />
    </>
  );
};

export const CheckInAction = ({ schedule }: { schedule: ScheduleType }) => {
  console.log();
  return <CheckIn schedule={schedule} />;
};

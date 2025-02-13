import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CheckOutDialog } from "./checkout-dialog";
import { CheckIn } from "./check-correct-location";
import { Visit } from "@/types/types";
export const CheckOutAction = ({ schedule }: { schedule: Visit }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <Button onClick={() => setShowEditForm(true)}>CheckOut</Button>
      <CheckOutDialog
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

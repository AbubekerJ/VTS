import React, { useState } from "react";
import RescheduleForm from "./re-schedule-form";
export const RescheduleAction = ({ scheduleId }: { scheduleId: string }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <span
        className="text-primary cursor-pointer"
        onClick={() => setShowEditForm(true)}
      >
        Reschedule
      </span>
      <RescheduleForm
        scheduleId={scheduleId}
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
      />
    </>
  );
};

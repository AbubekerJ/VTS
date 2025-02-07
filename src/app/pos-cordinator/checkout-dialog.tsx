import { Dialog, DialogContent } from "@/components/ui/dialog";
import LogForm from "./log-form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ScheduleType } from "./table";

export function CheckOutDialog({
  open,
  onClose,
  schedule,
}: {
  open: boolean;
  onClose: () => void;
  schedule: ScheduleType;
}) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTitle hidden> Visit Report</DialogTitle>
        <DialogContent className="w-[90%] md:w-full ">
          <LogForm schedule={schedule} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

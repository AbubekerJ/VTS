import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function VisitLogModal({
  open,
  onClose,
  visitLog,
}: {
  open: boolean;
  onClose: () => void;
  visitLog: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle hidden> Visit Log</DialogTitle>
      <DialogContent className="w-[90%] md:w-full">
        <h1 className="p-2 bg-gray-200 w-max rounded">Visit Log</h1>
        <Card className="w-full mt-5">
          <CardContent className="max-h-[400px] overflow-y-scroll p-4">
            {visitLog}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

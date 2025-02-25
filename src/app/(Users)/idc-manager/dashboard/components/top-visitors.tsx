import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetTop5Visitors } from "../../query";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import React from "react";

export function TopVisitors({
  selectedDate,
}: {
  selectedDate: DateRange | undefined;
}) {
  const { data: visitors } = useGetTop5Visitors(selectedDate);
  return (
    <div className="space-y-8">
      {visitors?.map((visitor) => (
        <React.Fragment key={visitor.coordinator?.id}>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {visitor.coordinator?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {visitor.coordinator?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {visitor.coordinator?.email}
              </p>
            </div>
            <div className="ml-auto font-medium">
              <Badge variant={"secondary"}>{visitor.visitCount} Visits</Badge>
            </div>
          </div>
          <Separator className="" />
        </React.Fragment>
      ))}
    </div>
  );
}

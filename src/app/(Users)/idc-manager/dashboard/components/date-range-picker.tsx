"use client";

import * as React from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  setSelectedDate: (dateRange: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  className,
  setSelectedDate,
}: DatePickerProps) {
  const currentDate = new Date();
  const initialFromDate = startOfMonth(currentDate);
  const initialToDate = endOfMonth(currentDate);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialFromDate,
    to: initialToDate,
  });
  const handleClick = () => {
    setSelectedDate(date);
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button className=" hidden sm:block" onClick={handleClick}>
        search
      </Button>
    </div>
  );
}

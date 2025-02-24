import { endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

export function getDateFilters(selectedDateRange?: DateRange | undefined) {
  if (!selectedDateRange?.from) return {};

  const startDate = selectedDateRange.from.toISOString();
  const endDate = selectedDateRange.to
    ? selectedDateRange.to.toISOString()
    : endOfDay(selectedDateRange.from).toISOString();

  return {
    checkInDate: {
      gte: startDate,
      lte: endDate,
    },
  };
}

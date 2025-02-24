import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetTop5Visitors } from "../../query";

export function RecentSales() {
  const { data: visitors } = useGetTop5Visitors();
  return (
    <div className="space-y-8">
      {visitors?.map((visitor) => (
        <div className="flex items-center" key={visitor.coordinator?.id}>
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
          <div className="ml-auto font-medium">{visitor.visitCount} Visits</div>
        </div>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function Cards({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-auto", className)} {...props}>
      <CardHeader>
        <CardTitle>Total Visit</CardTitle>
        <CardDescription>Your total visit this month</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 items-center text-xl font-bold">
        300
      </CardContent>
    </Card>
  );
}

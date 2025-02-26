"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAllVisitCounts } from "../../app/(Users)/idc-manager/query";
import { DateRange } from "react-day-picker";

const chartConfig = {
  count: {
    label: "Issues",
    color: "hsl(var(--primary))",
  },

  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function IssueChart({
  selectedDate,
}: {
  selectedDate: DateRange | undefined;
}) {
  const { data: allIssuesCount } = useGetAllVisitCounts(selectedDate);

  console.log("Fetched Issues Count:", allIssuesCount);
  const chartData = allIssuesCount ?? [];
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Visit issues overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="issueName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-count)"
              radius={4}
              barSize={40}
            >
              <LabelList
                dataKey="issueName"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          An overview of the frequency and types of visit issues encountered
        </div>
      </CardFooter>
    </Card>
  );
}

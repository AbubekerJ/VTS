"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import { ScheduleType } from "./table";
import { useGetAllIssues } from "../idc-manager/query";
// import { useCheckInTime } from "../context/check-in-time-context";
import { MultiSelect } from "./component/multi-select";
import { useSubmitVisitLogs } from "./query";
// import { format } from "date-fns";

const formSchema = z.object({
  visit_report: z.string(),
  issues: z.array(z.string()),
});

export default function LogForm({ schedule }: { schedule: ScheduleType }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: updateSchedule } = useSubmitVisitLogs();
  const { data: issues } = useGetAllIssues();

  const issueOptions =
    issues?.map((issue) => ({
      label: issue.description.trim(),
      value: issue.id.trim(),
    })) ?? [];

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const checkOutDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      updateSchedule(
        {
          checkOutdate: checkOutDate,
          id: schedule.id,
          status: "COMPLETED",
          issues: values.issues.map((id) => ({ id })),
        },
        {
          onSuccess: () => {
            console.log("succuss");
            toast.success("update completed");
          },
          onError: (error) => {
            console.error("Update failed", error);
          },
        }
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto  "
      >
        <FormField
          control={form.control}
          name="visit_report"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visit Report</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Report"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Notes on findings or observations made during the visit. Any
                issues encountered at the location
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issues</FormLabel>
              <FormControl>
                <MultiSelect
                  options={issueOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select options"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
              <FormDescription>
                Choose the issues you are interested in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

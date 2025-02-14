"use client";

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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import { Textarea } from "@/components/ui/textarea";

import { ScheduleType } from "../table";
import { useGetAllIssues } from "../../idc-manager/query";
// import { useCheckInTime } from "../context/check-in-time-context";
import { MultiSelect } from "./multi-select";
import { useSubmitVisitLogs } from "../query";
import { useToast } from "@/hooks/use-toast";
// import { format } from "date-fns";

const formSchema = z.object({
  visit_report: z.string(),
  issues: z.array(z.string()).nullable().optional(),
});

export default function LogForm({
  open,
  onClose,
  schedule,
}: {
  open: boolean;
  onClose: () => void;
  schedule: ScheduleType;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: updateSchedule } = useSubmitVisitLogs();
  const { data: issues } = useGetAllIssues();
  const { toast } = useToast();

  const issueOptions =
    issues?.map((issue) => ({
      label: issue.description.trim(),
      value: issue.id.trim(),
    })) ?? [];

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const checkOutDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      const storedCheckIns: { id: string; checkInTime: string }[] = JSON.parse(
        localStorage.getItem("checkInTimes") || "[]"
      );

      const checkInDate = storedCheckIns.find(
        (item) => item.id === schedule.id
      );

      if (checkInDate) {
        console.log("Check-in Time:", checkInDate.checkInTime);
      } else {
        console.log("No check-in found for this ID.");
      }

      updateSchedule(
        {
          checkIndate: checkInDate?.checkInTime || "",
          checkOutdate: checkOutDate,
          id: schedule.id,
          status: "COMPLETED",
          issues: values?.issues?.map((id) => ({ id })) || [],
          notes: values.visit_report,
        },
        {
          onSuccess: () => {
            toast({
              description: "Visit Report Submitted",
            });
            const updatedCheckIns = storedCheckIns.filter(
              (item) => item.id !== schedule.id
            );
            localStorage.setItem(
              "checkInTimes",
              JSON.stringify(updatedCheckIns)
            );

            onClose();
          },
          onError: (error) => {
            console.error("Update failed", error);
          },
        }
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle hidden> Visit Report</DialogTitle>
      <DialogContent className="w-[90%] md:w-full ">
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
                      defaultValue={field.value ?? []}
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
      </DialogContent>
    </Dialog>
  );
}

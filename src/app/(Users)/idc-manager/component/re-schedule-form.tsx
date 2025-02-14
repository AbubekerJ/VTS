"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useUpdateVisitDate } from "../query";

const formSchema = z.object({
  rescheduleDate: z.coerce.date(),
});

export default function RescheduleForm({
  open,
  onClose,
  scheduleId,
}: {
  open: boolean;
  onClose: () => void;
  scheduleId: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rescheduleDate: new Date(),
    },
  });
  const { mutate: updateSchedule } = useUpdateVisitDate();
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log({ ...values, scheduleId });
      updateSchedule(
        {
          ...values,
          id: scheduleId,
          rescheduleDate: values.rescheduleDate.toISOString(),
        },
        {
          onSuccess: () => {
            console.log("reschedule success");
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );

      onClose();
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle hidden> ReSchedule</DialogTitle>
      <DialogContent className="w-[90%] md:w-full ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="rescheduleDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Reschedule Date</FormLabel>
                  <DatetimePicker
                    {...field}
                    format={[
                      ["months", "days", "years"],
                      ["hours", "minutes", "am/pm"],
                    ]}
                  />
                  <FormDescription>
                    {" "}
                    Select a new date and time for the rescheduled visit.
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

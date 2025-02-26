"use client";

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
import { useUpdateVisitDate } from "../../query";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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
            toast({
              variant: "default",
              title: "Success",
              description: "Reschedule success",
            });
          },
          onError: () => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          },
        }
      );

      onClose();
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
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

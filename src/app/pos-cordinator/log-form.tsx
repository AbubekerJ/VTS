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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleType } from "./table";
import { useUpdateSchedule } from "./query";

const formSchema = z.object({
  visit_report: z.string(),
  issue_select: z.string(),
});

export default function LogForm({ schedule }: { schedule: ScheduleType }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  console.log(
    "schedule store................................",
    schedule.location
  );
  const { mutate: updateSchedule } = useUpdateSchedule();
  const visitEndDate = "test date";
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log({
        ...values,
        location: schedule.location,
        visitEndDate,
      });

      updateSchedule(
        { id: schedule.id, status: "completed" },
        {
          onSuccess: () => {
            console.log("succuss");
          },
          onError: (error) => {
            console.error("Update failed", error);
          },
        }
      );
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
          name="issue_select"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issues</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="issues" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="item-not-found">
                    Item not found in stock
                  </SelectItem>
                  <SelectItem value="store-cleanliness">
                    Store cleanliness issues
                  </SelectItem>
                  <SelectItem value="product-damage">
                    Damaged product received
                  </SelectItem>
                  <SelectItem value="wrong-product-delivered">
                    Wrong product delivered
                  </SelectItem>
                  <SelectItem value="broken-equipment">
                    Broken or malfunctioning store equipment
                  </SelectItem>
                  <SelectItem value="incorrect-pricing">
                    Incorrect pricing on items
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select Issues you have found</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

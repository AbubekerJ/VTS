"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import {
  useGetAllPartners,
  useGetAllVisitorUnderThisManager,
  useScheduleVisit,
} from "../query";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  partner: z.string(),
  visitor: z.string(),
  date: z.coerce.date(),
});

export default function AddSchedule({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: visitors } = useGetAllVisitorUnderThisManager();
  const { data: partners } = useGetAllPartners();
  const { mutate: addSchedule } = useScheduleVisit();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log({ ...values, date: values.date.toISOString() });
      addSchedule(
        {
          ...values,
          date: values.date.toISOString(),
        },
        {
          onSuccess: () => {
            toast({
              description: "Scheduled Added",
            });
            onClose();
            console.log("schedule success");
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Scheduled Added field ",
        description: "Scheduled Added field ",
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
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="partner"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Partner</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? partners?.find(
                                    (language) => language.id === field.value
                                  )?.name
                                : "Select partner"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {partners?.map((partner) => (
                                  <CommandItem
                                    id={partner.name}
                                    key={partner.id}
                                    onSelect={() => {
                                      form.setValue("partner", partner.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        partner.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {partner.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This is the language that will be used in the dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="visitor"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>visitor</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? visitors?.find(
                                    (visitor) => visitor.id === field.value
                                  )?.name
                                : "Select visitor"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {visitors?.map((visitor) => (
                                  <CommandItem
                                    id={visitor.name}
                                    key={visitor.id}
                                    onSelect={() => {
                                      form.setValue("visitor", visitor.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        visitor.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {visitor.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This is the language that will be used in the dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Schedule Date</FormLabel>
                  <DatetimePicker
                    {...field}
                    format={[
                      ["months", "days", "years"],
                      ["hours", "minutes", "am/pm"],
                    ]}
                  />
                  <FormDescription>
                    Add the date of Schedule Date.
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

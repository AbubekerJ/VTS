"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useCreatePartner } from "../../query";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string(),
  latitude: z.string().min(1),
  longitude: z.string().min(1),
});

export default function AddPartnerForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      latitude: "",
      longitude: "",
    },
  });

  const { mutate: createVisitor } = useCreatePartner();
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      createVisitor(values, {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Success",
            description: "Partner Added",
          });
          onClose();
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle hidden> ReSchedule</DialogTitle>
      <DialogContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Partner Name" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Name of the Partner</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Latitude" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    latitude of the partner eg: (9.0089023)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Longitude" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    longitude of the partner eg: (38.7466258)
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

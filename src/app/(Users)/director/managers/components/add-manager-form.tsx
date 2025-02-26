"use client";

// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { Eye, EyeOff } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { useCreateIdcManager } from "../query";

const formSchema = z.object({
  email: z.string().email(),
  // password: z.string().min(6),
  name: z.string().min(3),
});

export default function AddManagerForm({
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
      email: "",
      // password: "",
    },
  });

  // const [showPassword, setShowPassword] = useState(false);
  const { mutate: createManager } = useCreateIdcManager();
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createManager(values, {
      onSuccess: (response) => {
        if (response.success) {
          toast({
            variant: "default",
            title: "Success",
            description: response.message,
          });
          onClose();
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
        }
      },
      onError: (error) => {
        console.error("Error creating visitor:", error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "An unexpected error occurred. Please try again.",
        });
      },
    });
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Name of the manager</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Email of the manager</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Password for the user. This will be changed by the user
                    later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

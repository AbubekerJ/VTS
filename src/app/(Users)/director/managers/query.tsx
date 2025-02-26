import { createManager } from "@/app/server/idc-manager";
import { queryClient } from "@/config/all-provider";
import { useMutation } from "@tanstack/react-query";

export const useCreateIdcManager = () => {
  return useMutation({
    mutationFn: async (values: {
      name: string;
      email: string;
      password: string;
    }) => {
      createManager(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers"] });
    },
    onError: () => {
      console.log("error creating manager");
    },
  });
};

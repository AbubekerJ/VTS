import { createManager } from "@/app/server/idc-manager";
import { queryClient } from "@/config/all-provider";
import { useMutation } from "@tanstack/react-query";

export const useCreateIdcManager = () => {
  return useMutation<
    { success: boolean; message: string },
    Error,
    { name: string; email: string }
  >({
    mutationFn: async ({ name, email }) => {
      const response = await createManager({ name, email });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
    onError: (error) => {
      console.error("Error creating visitor:", error);
    },
  });
};

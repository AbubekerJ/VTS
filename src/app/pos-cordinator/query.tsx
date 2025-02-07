import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../config/query-client";

export const useGetAllSchedule = () => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const data = await axios.get(
        "https://6790d226af8442fd7377e073.mockapi.io/schedule"
      );
      console.log("data.....................................", data);
      return data;
    },
  });
};

export const useUpdateSchedule = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log("id......................", id);
      const { data } = await axios.put(
        `https://6790d226af8442fd7377e073.mockapi.io/schedule/${id}`,
        { status }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};

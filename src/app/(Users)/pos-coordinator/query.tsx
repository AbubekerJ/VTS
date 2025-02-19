import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/all-provider";
import {
  getCompletedVisits,
  getPosCoordinatorVisits,
  submitVisitLogs,
  updateVisitStatus,
} from "@/app/server/visits";
import { VisitStatus } from "@prisma/client";
export const useGetAllSchedule = () => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const data = await getPosCoordinatorVisits();
      return data;
    },
  });
};

export const useSubmitVisitLogs = () => {
  return useMutation({
    mutationFn: async ({
      id,
      status,
      issues,
      checkOutdate,
      checkIndate,
      notes,
    }: {
      id: string;
      status: VisitStatus;
      issues: { issueId: string; description: string; status: string }[];
      checkOutdate: string;
      checkIndate: string;
      notes: string;
    }) => {
      const data = await submitVisitLogs({
        id,
        status,
        issues,
        checkOutdate,
        checkIndate,
        notes,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};

export const useUpdateSchedule = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: VisitStatus }) => {
      const data = await updateVisitStatus({
        id,
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};

export function useGetCompletedVists() {
  return useQuery({
    queryKey: ["CompletedVisits"],
    queryFn: async () => {
      const data = await getCompletedVisits();
      return data;
    },
  });
}

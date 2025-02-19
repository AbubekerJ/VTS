import { queryClient } from "@/app/config/all-provider";
import { getAllIssues, getAllVisitIssues, updateIssueStatus } from "@/app/server/issues";
import { getAllPartners } from "@/app/server/partners";
import {
  createVisitor,
  getVisitorUnderThisManager,
} from "@/app/server/pos-coordinators";
import {
  getScheduledVisit,
  rescheduleVisit,
  scheduleVisit,
} from "@/app/server/visits";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllVisitorUnderThisManager = () => {
  return useQuery({
    queryKey: ["visitors"],
    queryFn: async () => {
      const data = await getVisitorUnderThisManager();
      console.log(
        "all visitor data in query file................................",
        data
      );
      return data;
    },
  });
};

export const useGetAllIssues = () => {
  return useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const data = await getAllIssues();

      return data;
    },
  });
};

export const useGetAllVisitIssues = () => {
  return useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const data = await getAllVisitIssues();

      return data;
    },
  });
};

export const useGetScheduledVisits = () => {
  return useQuery({
    queryKey: ["scheduledVisit"],
    queryFn: async () => {
      const data = await getScheduledVisit();
      return data;
    },
  });
};

//reschedule visit

export const useUpdateVisitDate = () => {
  return useMutation({
    mutationFn: async ({
      id,
      rescheduleDate,
    }: {
      id: string;
      rescheduleDate: string;
    }) => {
      const data = await rescheduleVisit({
        id,
        rescheduleDate,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["scheduledVisit"],
      });
      queryClient.invalidateQueries({
        queryKey: ["schedule"],
      });
    },
  });
};

////get all partners

export const useGetAllPartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const data = await getAllPartners();
      console.log(
        "all partners data in query file................................",
        data
      );
      return data;
    },
  });
};

//schedule visit

export const useScheduleVisit = () => {
  return useMutation({
    mutationFn: async ({
      date,
      partner,
      visitor,
    }: {
      date: string;
      partner: string;
      visitor: string;
    }) => {
      const data = await scheduleVisit({ date, partner, visitor });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduledVisit"] });
    },
    onError: (error) => {
      console.error("Error scheduling visit:", error);
    },
  });
};

///create visitor

export const useCreateVisitor = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const data = await createVisitor({ name, email, password });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
    onError: (error) => {
      console.error("Error creating visitor:", error);
    },
  });
};



///update issue status

export const useUpdateIssuesStatus = () => {
  return useMutation({
    mutationFn: async ({
      issueId,
      status,
      visitId,
    }: {
      issueId: string;
      status:"SOLVED" | "NOT_SOLVED";
      visitId: string;
    }) => {
      const data = await updateIssueStatus({ issueId, status, visitId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: (error) => {
      console.error("Error updating issue status:", error);
    },
  })
}
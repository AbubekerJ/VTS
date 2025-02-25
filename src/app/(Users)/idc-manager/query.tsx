import { queryClient } from "@/config/all-provider";
import {
  getAllIssues,
  getAllVisitIssuesCount,
  getNotSolvedIssueCount,
  updateIssueStatus,
} from "@/app/server/issues";
import { getAllPartners } from "@/app/server/partners";
import {
  createVisitor,
  getTop5VisitorsWithMostVisits,
  getVisitorUnderThisManager,
} from "@/app/server/pos-coordinators";
import {
  getCountVisits,
  rescheduleVisit,
  scheduleVisit,
} from "@/app/server/visits";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

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

// export const useGetAllVisitIssues = (
//   selectedDateRange?: DateRange | undefined,
//   enabled = false
// ) => {
//   return useQuery({
//     queryKey: ["issues", selectedDateRange],
//     enabled,
//     queryFn: async () => {
//       const params = selectedDateRange
//         ? {
//             startDate: selectedDateRange.from
//               ? selectedDateRange.from.toISOString().split("T")[0]
//               : undefined,
//             endDate: selectedDateRange.to
//               ? selectedDateRange.to.toISOString().split("T")[0]
//               : undefined,
//           }
//         : {};
//       const data = await getAllVisitIssues(params);
//       return data;
//     },
//   });
// };

// export const useGetScheduledVisits = () => {
//   return useQuery({
//     queryKey: ["scheduledVisit"],
//     queryFn: async () => {
//       const data = await getScheduledVisit();
//       return data;
//     },
//   });
// };

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
      status: "SOLVED" | "NOT_SOLVED";
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
  });
};

////Dashboard

export const useGetVisitCounts = (selectedDate: DateRange | undefined) => {
  return useQuery({
    queryKey: ["visitCount", selectedDate],
    queryFn: async () => {
      const data = await getCountVisits(selectedDate);
      return data;
    },
  });
};

export const useGetNotSolvedIssueCount = (
  selectedDate: DateRange | undefined
) => {
  return useQuery({
    queryKey: ["NotSolvedIssueCount", selectedDate],
    queryFn: async () => {
      const data = await getNotSolvedIssueCount(selectedDate);
      return data;
    },
  });
};

/// get all visit issues count
export const useGetAllVisitCounts = (selectedDate: DateRange | undefined) => {
  return useQuery({
    queryKey: ["allIssuesCount", selectedDate],
    queryFn: async () => {
      const data = await getAllVisitIssuesCount(selectedDate);
      return data;
    },
  });
};

//get top 5 visitors

export const useGetTop5Visitors = (selectedDate: DateRange | undefined) => {
  return useQuery({
    queryKey: ["topVisitors", selectedDate],
    queryFn: async () => {
      const data = await getTop5VisitorsWithMostVisits(selectedDate);
      return data;
    },
  });
};

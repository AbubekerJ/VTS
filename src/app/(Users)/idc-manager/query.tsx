import { getAllIssues, getAllVisitIssues } from "@/app/server/issues";
import { getVisitorUnderThisManager } from "@/app/server/pos-coordinators";
import { useQuery } from "@tanstack/react-query";

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

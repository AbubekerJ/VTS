export type Visit = {
  id: string;
  date: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  location: string;
  latitude?: number;
  longitude?: number;
};

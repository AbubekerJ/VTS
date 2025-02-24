import xlsx, { IJsonSheet } from "json-as-xlsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function downloadToExcel(data: any[]) {
  const columns: IJsonSheet[] = [
    {
      sheet: "Issues",
      columns: [
        { label: "Partner", value: "partner" },
        { label: "Logged By", value: "createdBy" },
        { label: "Issue", value: "issue" },
        { label: "Status", value: "status" },
        { label: "Created Date", value: "createdDate" },
        { label: "Logged Report", value: "visitLog" },
      ],
      content: data, // Pass extracted data
    },
  ];

  const settings = {
    fileName: "Issues Report",
  };

  xlsx(columns, settings);
}

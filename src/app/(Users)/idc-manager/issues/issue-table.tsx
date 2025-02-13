"use client";
import React from "react";
import { useGetAllIssues } from "../query";

const IssueTable = () => {
  const { data: issues } = useGetAllIssues();
  console.log("issues.........................................", issues);

  return <div>IssueTable</div>;
};

export default IssueTable;

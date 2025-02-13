"use client";
import React from "react";
import { useGetAllVisitorUnderThisManager } from "../query";

const VisitorTable = () => {
  const {
    data: visitors,
    isLoading,
    isError,
  } = useGetAllVisitorUnderThisManager();
  if (isLoading) {
    console.log("loading..........");
  }
  if (isError) {
    console.log("error....");
  }
  console.log("visitors..........................", visitors);
  return <div>VisitorTable</div>;
};

export default VisitorTable;

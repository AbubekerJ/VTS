"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CheckInTimeContextType {
  checkInTime: string | null;
  setCheckInTime: React.Dispatch<React.SetStateAction<string | null>>;
}

const CheckInTimeContext = createContext<CheckInTimeContextType | null>(null);

export const CheckInTimeProvider = ({ children }: { children: ReactNode }) => {
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  return (
    <CheckInTimeContext.Provider value={{ checkInTime, setCheckInTime }}>
      {children}
    </CheckInTimeContext.Provider>
  );
};
export const useCheckInTime = () => {
  const context = useContext(CheckInTimeContext);
  if (!context) {
    throw new Error("useCheckInTime must be used within a CheckInTimeProvider");
  }
  return context;
};

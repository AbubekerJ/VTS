"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"

export const queryClient = new QueryClient();

type props = {
  children: React.ReactNode;
};

const AllProvider = ({ children }: props) => {
  return (
    <SessionProvider >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default AllProvider;



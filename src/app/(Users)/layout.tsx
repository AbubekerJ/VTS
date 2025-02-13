import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CheckInTimeProvider } from "./context/check-in-time-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <CheckInTimeProvider>
        <main className=" w-full h-full  ">
          <SidebarTrigger />
          {children}
        </main>
      </CheckInTimeProvider>
    </SidebarProvider>
  );
}

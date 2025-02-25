"use client";

import * as React from "react";
import {
  UsersRound,
  LayoutDashboard,
  CalendarCheck2,
  FileClock,
  NotebookPen,
} from "lucide-react";
import { useSession } from "next-auth/react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarLogo from "./sidebar-logo";
import { NavMain } from "./nav-main";

type Role = "POS_COORDINATOR" | "IDC_MANAGER" | "DIRECTOR";

const rolePermissions: Record<Role, string[]> = {
  POS_COORDINATOR: ["Schedule", "History"],
  IDC_MANAGER: ["Dashboard", "Schedule", "Visitor", "Reports"],
  DIRECTOR: ["Dashboard"],
};

// Full data
const data = {
  user: {
    name: "Test User",
    email: "test@example.com",
  },
  MainItems: [
    {
      name: "Dashboard",
      url: "/idc-manager/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Schedule",
      url: "/idc-manager/schedules",
      icon: CalendarCheck2,
    },
    {
      name: "Visitor",
      url: "/idc-manager/visitors",
      icon: UsersRound,
    },
    {
      name: "Reports",
      url: "/idc-manager/issues",
      icon: NotebookPen,
    },
    {
      name: "History",
      url: "/pos-coordinator/pos-coordinator-history",
      icon: FileClock,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as Role | undefined;
  const userName = session?.user.name as string;
  const userEmail = session?.user.email as string;

  data.user.name = userName;
  data.user.email = userEmail;

  const filteredDashboards =
    userRole && rolePermissions[userRole]
      ? data.MainItems.filter((item) =>
          rolePermissions[userRole].includes(item.name)
        )
      : [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-3">
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="my-6 md:mt-11">
        <NavMain dashboard={filteredDashboards} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

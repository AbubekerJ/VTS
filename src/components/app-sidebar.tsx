"use client";

import * as React from "react";
import { SquareTerminal, UsersRound, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarLogo from "./sidebar-logo";
import { NavProjects } from "./nav-projects";

type Role = "POS_COORDINATOR" | "IDC_MANAGER";

const rolePermissions: Record<Role, string[]> = {
  POS_COORDINATOR: ["Visits"],
  IDC_MANAGER: ["Dashboard", "visitors"],
};

// Full data
const data = {
  user: {
    name: "Test User",
    email: "test@example.com",
  },

  dashboard: [
    {
      name: "Dashboard",
      url: "/idc-manager/dashboard",
      icon: LayoutDashboard,
    },
  ],
  navMain: [
    {
      title: "Visits",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Schedules",
          url: "/pos-coordinator",
        },
        {
          title: "History",
          url: "/pos-coordinator/pos-coordinator-history",
        },
      ],
    },

    {
      title: "visitors",
      url: "/idc-manager/visitors",
      icon: UsersRound,
      items: [
        {
          title: "Visitor",
          url: "/idc-manager/visitors",
        },
        {
          title: "Issues Reported",
          url: "/idc-manager/issues",
        },
      ],
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
  const filteredNavMain = userRole
    ? data.navMain.filter((item) =>
        rolePermissions[userRole]?.includes(item.title)
      )
    : [];

  const filteredDashboards =
    userRole && rolePermissions[userRole]
      ? data.dashboard.filter((dashboard) =>
          rolePermissions[userRole].includes(dashboard.name)
        )
      : [];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className=" gap-0 mt-8">
        <NavProjects dashboard={filteredDashboards} />
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

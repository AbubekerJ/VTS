"use client";

import * as React from "react";
import { Bot, SquareTerminal, UsersRound, LayoutDashboard } from "lucide-react";
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

type Role = "POS_COORDINATOR" | "IDC_MANAGER";

const rolePermissions: Record<Role, string[]> = {
  POS_COORDINATOR: ["Visits"],
  IDC_MANAGER: ["Dashboard", "Pos-Coordinators"],
};

// Full data
const data = {
  user: {
    name: "Test User",
    email: "test@example.com",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Visits",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "All",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Bot,
    },
    {
      title: "Pos-Coordinators",
      url: "#",
      icon: UsersRound,
    },
    {
      title: "IDC-Managers",
      url: "#",
      icon: UsersRound,
    },
  ],
};

// Filter navigation items based on the user role

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const userRole = session?.user?.role as Role | undefined;
  const filteredNavMain = userRole
    ? data.navMain.filter((item) =>
        rolePermissions[userRole]?.includes(item.title)
      )
    : [];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import { Bot, SquareTerminal, UsersRound, LayoutDashboard } from "lucide-react";

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

// This is sample data.
const userRole = "idc-manager";
const rolePermissions = {
  "pos-cordinator": ["Visits"],
  "idc-manager": ["Dashboard", "Pos-Cordinators"],
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
      title: "Pos-Cordinators",
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
const filteredNavMain = data.navMain.filter((item) =>
  rolePermissions[userRole]?.includes(item.title)
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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

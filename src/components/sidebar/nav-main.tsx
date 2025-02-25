"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  dashboard,
}: {
  dashboard: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="my-0 py-0 ">
      <SidebarMenu>
        {dashboard.map((item) => (
          <SidebarMenuItem key={item.name} className="mt-2  ">
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon className="text-primary text-lg" />
                <span className="text-lg">{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

"use client";

import * as React from "react";
import {
  ChevronsLeft,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Plus,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function TeamSwitcher() {
  const { isMobile, setOpenMobile, openMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="inline-flex items-center flex-row">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">SR Developers</span>
            <Badge variant="premium" className="truncate text-xs">
              Premium Plots
            </Badge>
          </div>
        </SidebarMenuButton>
        {isMobile && (
          <Button variant="ghost" onClick={() => setOpenMobile(!openMobile)}>
            <ChevronsLeft />
          </Button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

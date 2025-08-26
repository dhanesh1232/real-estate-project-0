"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminLinks } from "@/lib/client/default_data";

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {AdminLinks.map((each) => {
          const Icon = Icons[each.icon];
          return (
            <SidebarMenuItem key={each.id}>
              <SidebarMenuButton
                asChild
                tooltip={each.label}
                isActive={pathname === each.href}
              >
                <Link href={each.href}>
                  <Icon />
                  {each.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

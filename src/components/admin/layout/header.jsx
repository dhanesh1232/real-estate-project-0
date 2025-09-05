import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdminBreadcrumb } from "./admin-breadcrumb";
import { NotificationBell } from "@/components/admin/layout/compo/bell";

export const AdminHeader = () => {
  return (
    <header className="flex h-12 shrink-0 z-40 bg-background items-center justify-between pr-4 sticky top-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <AdminBreadcrumb />
      </div>
      <NotificationBell />
    </header>
  );
};

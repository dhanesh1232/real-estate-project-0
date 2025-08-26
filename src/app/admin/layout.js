import { AdminHeader } from "@/components/admin/layout/header";
import { AppSidebar } from "@/components/admin/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

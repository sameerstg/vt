import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardLayout from "@/app/admin/components/DashboardLayout";

export default function AdminLayout({ children }) {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}

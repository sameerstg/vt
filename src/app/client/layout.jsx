import DashboardLayout from "@/components/dashboard-client/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export default function ClientLayout({ children }) {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}

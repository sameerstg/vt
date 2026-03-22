import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardLayout from "@/app/contractor/components/DashboardLayout";

export default function WorkerLayout({ children }) {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}

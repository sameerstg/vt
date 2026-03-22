import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardLayout from "@/app/worker/components/DashboardLayout";

export default function ContractorLayout({ children }) {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}

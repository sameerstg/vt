import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import FinancialOverviewInfo from "@/components/dashboard-admin/section/FinancialOverviewInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask | Financial Overview",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <FinancialOverviewInfo />
      </DashboardLayout>
    </>
  );
}

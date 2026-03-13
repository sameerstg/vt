'use client';
import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import DashboardInfo from "@/components/dashboard-contractor/section/DashboardInfo";
import TeamManagementInfo from "@/components/dashboard-contractor/section/TeamManagementInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <DashboardInfo />
        {/* Uncomment below to show Team Management in dashboard */}
        <TeamManagementInfo />
      </DashboardLayout>
    </>
  );
}


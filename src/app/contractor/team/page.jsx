import DashboardLayout from "@/app/contractor/components/DashboardLayout";
import TeamManagementInfo from "@/app/contractor/components/section/TeamManagementInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - Team Management",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TeamManagementInfo />
      </DashboardLayout>
    </>
  );
}

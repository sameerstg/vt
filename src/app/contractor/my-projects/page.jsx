import DashboardLayout from "@/app/contractor/components/DashboardLayout";
import ContractorAssignedProjectsInfo from "@/app/contractor/components/section/ContractorAssignedProjectsInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - My Projects",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ContractorAssignedProjectsInfo />
      </DashboardLayout>
    </>
  );
}

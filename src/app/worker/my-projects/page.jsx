import DashboardLayout from "@/app/worker/components/DashboardLayout";
import AssignedProjectsInfo from "@/app/worker/components/section/AssignedProjectsInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - My Projects",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <AssignedProjectsInfo />
      </DashboardLayout>
    </>
  );
}

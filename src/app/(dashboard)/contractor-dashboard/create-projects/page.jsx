import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import CreateProjectInfo from "@/components/dashboard-contractor/section/CreateProjectInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title:
    "VeriTask | Create Project",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <CreateProjectInfo />
      </DashboardLayout>
    </>
  );
}


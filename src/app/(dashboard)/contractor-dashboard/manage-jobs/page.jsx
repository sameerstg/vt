import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import TaskDiscoveryInfo from "@/components/dashboard-contractor/section/TaskDiscoveryInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Contractor Dashboard | Task Discovery",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <TaskDiscoveryInfo />
      </DashboardLayout>
    </>
  );
}

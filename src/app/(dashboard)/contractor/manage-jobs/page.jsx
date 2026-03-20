import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import ManageJobInfo from "@/components/dashboard-contractor/section/ManageJobInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Manage Job",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <ManageJobInfo />
      </DashboardLayout>
    </>
  );
}


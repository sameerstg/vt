import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import ManageServiceInfo from "@/components/dashboard-worker/section/ManageServiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title:
    "Freeio - Freelance Marketplace React/Next Js Template | Manage Services",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <ManageServiceInfo />
      </DashboardLayout>
    </>
  );
}


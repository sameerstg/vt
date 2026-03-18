import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import ManageServiceInfo from "@/components/dashboard-contractor/section/ManageServiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title:
    "VeriTask | Manage Services",
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


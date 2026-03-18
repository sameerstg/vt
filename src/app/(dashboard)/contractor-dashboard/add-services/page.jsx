import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import AddServiceInfo from "@/components/dashboard-contractor/section/AddServiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask | Add Service",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <AddServiceInfo />
      </DashboardLayout>
    </>
  );
}


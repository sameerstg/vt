import DashboardLayout from "@/app/(dashboard)/contractor/components/DashboardLayout";
import AddServiceInfo from "@/app/(dashboard)/contractor/components/section/AddServiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Add Service",
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


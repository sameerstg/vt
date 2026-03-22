import DashboardLayout from "@/app/(dashboard)/contractor/components/DashboardLayout";
import DashboardInfo from "@/app/(dashboard)/contractor/components/section/DashboardInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Dashboard",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <DashboardInfo />
      </DashboardLayout>
    </>
  );
}


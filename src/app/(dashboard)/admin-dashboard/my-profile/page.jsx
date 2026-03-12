import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import MyProfileInfo from "@/components/dashboard-admin/section/MyProfileInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | My Profile",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <MyProfileInfo />
      </DashboardLayout>
    </>
  );
}


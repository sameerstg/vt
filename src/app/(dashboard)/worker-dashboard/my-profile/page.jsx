import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import MyProfileInfo from "@/components/dashboard-worker/section/MyProfileInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask | My Profile",
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


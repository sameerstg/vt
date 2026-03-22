import DashboardLayout from "@/app/worker/components/DashboardLayout";
import MyProfileInfo from "@/app/worker/components/section/MyProfileInfo";

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


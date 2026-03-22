import DashboardLayout from "@/app/worker/components/DashboardLayout";
import ManageProjectInfo from "@/app/worker/components/section/ManageProjectInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - Manage Projects",
};

export default function page() {
  return (
    <>

      <MobileNavigation2 />
      <DashboardLayout>
        <ManageProjectInfo />
      </DashboardLayout>
    </>
  );
}


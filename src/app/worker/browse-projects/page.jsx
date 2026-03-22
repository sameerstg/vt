import DashboardLayout from "@/app/worker/components/DashboardLayout";
import BrowseProjectsInfo from "@/app/worker/components/section/BrowseProjectsInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - Browse Projects",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <BrowseProjectsInfo />
      </DashboardLayout>
    </>
  );
}

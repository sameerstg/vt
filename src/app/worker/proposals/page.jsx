import DashboardLayout from "@/app/worker/components/DashboardLayout";
import WorkerProposalsInfo from "@/app/worker/components/section/WorkerProposalsInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - My Proposals",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <WorkerProposalsInfo />
      </DashboardLayout>
    </>
  );
}

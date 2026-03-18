import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import WorkerAppealInfo from "@/components/dashboard-worker/section/WorkerAppealInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask | Appeal / Dispute",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <WorkerAppealInfo />
      </DashboardLayout>
    </>
  );
}

import DashboardLayout from "@/app/worker/components/DashboardLayout";
import WorkerProjectDetailPage from "@/app/worker/components/section/WorkerProjectDetailPage";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - Project Details",
};

export default async function page({ params }) {
  const resolvedParams = await params;
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <WorkerProjectDetailPage projectId={resolvedParams.id} />
      </DashboardLayout>
    </>
  );
}

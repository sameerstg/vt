import DashboardLayout from "@/components/dashboard-client/DashboardLayout";
import ProjectDetailPage from "@/app/client/components/section/ProjectDetailPage";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask - Project Details",
};

export default async function ProjectDetail({ params }) {
  const resolvedParams = await params;
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ProjectDetailPage projectId={resolvedParams.id} />
      </DashboardLayout>
    </>
  );
}

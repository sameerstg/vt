import ProjectDetailPage from "@/app/client/components/section/ProjectDetailPage";

export const metadata = {
  title: "VeriTask - Project Details",
};

export default async function ProjectDetail({ params }) {
  const resolvedParams = await params;
  return <ProjectDetailPage projectId={resolvedParams.id} />;
}

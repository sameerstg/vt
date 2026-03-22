import WorkerProjectDetailPage from "@/app/worker/components/section/WorkerProjectDetailPage";

export const metadata = {
  title: "VeriTask - Project Details",
};

export default async function page({ params }) {
  const resolvedParams = await params;
  return <WorkerProjectDetailPage projectId={resolvedParams.id} />;
}

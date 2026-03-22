import WorkerSubmitWorkPage from "@/app/worker/components/section/WorkerSubmitWorkPage";

export const metadata = {
  title: "VeriTask - Submit Work",
};

export default async function page({ params }) {
  const resolvedParams = await params;
  return <WorkerSubmitWorkPage projectId={resolvedParams.id} />;
}

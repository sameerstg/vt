import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminTaskDetailContent from "@/components/dashboard/section/AdminTaskDetailContent";

export const metadata = {
  title: "Task Details | Admin Console",
};

export default function AdminTaskDetailPage({ params }) {
  const { id } = params;

  return (
    <DashboardLayout>
      <AdminTaskDetailContent taskId={id} />
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import TasksInfo from "@/components/dashboard-worker/section/TasksInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { workerSectionConfig } from "@/data/workerTasks";

const sectionKey = "assigned";

export const metadata = {
  title: `Worker Dashboard | ${workerSectionConfig[sectionKey].title}`,
};

const ASSIGNED_SECTIONS = [
  { key: "assigned", label: "All" },
  { key: "in_progress", label: "In Progress" },
  { key: "in_review", label: "In Review" },
  { key: "in_dispute", label: "In Dispute" },
  { key: "completed", label: "Completed" },
];

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TasksInfo
          initialFilter="assigned"
          pageTitle="Projects"
          pageDescription=""
          sections={ASSIGNED_SECTIONS}
        />
      </DashboardLayout>
    </>
  );
}

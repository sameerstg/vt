import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FeedbackInfo from "@/components/dashboard/section/FeedbackInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { feedbackItems, getFeedbackById } from "@/data/feedback";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Client Dashboard | Feedback",
};

export function generateStaticParams() {
  return feedbackItems.map((item) => ({ id: item.id }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const item = getFeedbackById(id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <FeedbackInfo item={item} />
      </DashboardLayout>
    </>
  );
}

import { redirect } from "next/navigation";
import { feedbackItems } from "@/data/feedback";

export default function Page() {
  const firstId = feedbackItems[0]?.id || "1";
  redirect(`/dashboard/feedback/${firstId}`);
}

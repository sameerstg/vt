import { redirect } from "next/navigation";

export default function page() {
  redirect("/seller/register?role=client");
}

import Breadcumb9 from "@/app/worker/components/breadcumb/Breadcumb9";
import TabSection1 from "@/app/worker/components/section/TabSection1";
import Listing8 from "@/app/worker/components/Listing8";
import DashboardLayout from "../components/DashboardLayout";

export const metadata = {
    title: "VeriTask - Browse Projects",
};

export default function page() {
    return (
        <DashboardLayout>
            <Breadcumb9 />
            <TabSection1 />
            <Listing8 />
        </DashboardLayout>
    );
}

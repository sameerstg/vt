import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import PrivacyPolicy1 from "@/components/section/PrivacyPolicy1";

export const metadata = {
    title: "Freeio - Privacy Policy | Freelance Marketplace",
    description: "Read our comprehensive privacy policy to understand how we protect your personal information.",
};

export default function page() {
    return (
        <>
            <Header20 />
            <PrivacyPolicy1 />
            <Footer />
        </>
    );
}

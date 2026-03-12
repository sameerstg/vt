import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import SubmitProposal1 from "@/components/section/SubmitProposal1";

export const metadata = {
  title: "Freeio - Worker Single Milestone Proposal",
};

export default function page({ searchParams }) {
  const milestone = searchParams?.milestone || "Selected milestone";

  return (
    <>
      <Header20 />
      <Breadcumb1
        title={"Submit Milestone Proposal"}
        brief={`You are submitting for: ${milestone}`}
        isBtnActive={false}
      />
      <SubmitProposal1 />
      <Footer />
    </>
  );
}

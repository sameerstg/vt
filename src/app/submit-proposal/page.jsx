import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import SubmitProposal1 from "@/components/section/SubmitProposal1";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Submit Proposal",
};

export default function page() {
  return (
    <>
      <Header20 />
      <Breadcumb1
        title={"Submit Proposal"}
        brief={"Share your price, timeline, and cover letter with the client."}
        isBtnActive={false}
      />
      <SubmitProposal1 />
      <Footer />
    </>
  );
}

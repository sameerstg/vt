import Footer from "@/components/footer/Footer";
import WorkerContractorRegisterForm from "@/components/auth/WorkerContractorRegisterForm";
import Header20 from "@/components/header/Header20";

export const metadata = {
  title: "Veritask | Worker / Contractor Register",
};

export default function SellerRegisterPage() {
  return (
    <div className="bgc-thm4">
      <Header20 />

      <section className="our-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
              <div className="main-title text-center">
                <h2 className="title">Worker / Contractor Register</h2>
           
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <WorkerContractorRegisterForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

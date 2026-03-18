import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import SellerLoginForm from "@/components/auth/SellerLoginForm";

export const metadata = {
  title: "Veritask | Seller Login",
};

export default function SellerLoginPage() {
  return (
    <div className="bgc-thm4">
      <Header20 />

      <section className="our-login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto wow fadeInUp" data-wow-delay="300ms">
              <div className="main-title text-center">
                <h2 className="title">Log In</h2>
                <p className="paragraph">
                  Access your account and manage your services.
                </p>
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <SellerLoginForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

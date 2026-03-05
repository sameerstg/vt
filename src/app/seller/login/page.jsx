import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import SellerPasswordFlowPopup from "@/components/auth/SellerPasswordFlowPopup";
import Link from "next/link";

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
                <h2 className="title">Seller Log In</h2>
                <p className="paragraph">
                  Sign in to manage your seller account and start offering services.
                </p>
              </div>
            </div>
          </div>

          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <div className="mb30">
                  <h4>Welcome back, Seller!</h4>
                  <p className="text">
                    New seller?{" "}
                    <Link href="/seller/register" className="text-thm">
                      Create seller account
                    </Link>
                  </p>
                </div>

                <div className="mb20">
                  <label className="form-label fw600 dark-color">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="mb15">
                  <label className="form-label fw600 dark-color">Password</label>
                  <input type="password" className="form-control" placeholder="*******" />
                </div>

                <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                  <label className="custom_checkbox fz14 ff-heading">
                    Remember me
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <SellerPasswordFlowPopup />
                </div>

                <div className="d-grid mb20">
                  <button className="ud-btn btn-thm" type="button">
                    Seller Log In <i className="fal fa-arrow-right-long" />
                  </button>
                </div>

                <div className="hr_content mb20">
                  <hr />
                  <span className="hr_top_text">OR</span>
                </div>

                <div className="d-md-flex justify-content-between">
                  <button className="ud-btn btn-fb fz14 fw400 mb-2 mb-md-0" type="button">
                    <i className="fab fa-facebook-f pr10" /> Continue Facebook
                  </button>
                  <button className="ud-btn btn-google fz14 fw400 mb-2 mb-md-0" type="button">
                    <i className="fab fa-google" /> Continue Google
                  </button>
                  <button className="ud-btn btn-apple fz14 fw400" type="button">
                    <i className="fab fa-apple" /> Continue Apple
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

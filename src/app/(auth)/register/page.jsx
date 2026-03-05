import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import Link from "next/link";

export default function page() {
    const roleSelectStyle = {
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundImage:
            "linear-gradient(45deg, transparent 50%, #6b7280 50%), linear-gradient(135deg, #6b7280 50%, transparent 50%)",
        backgroundPosition:
            "calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)",
        backgroundSize: "6px 6px, 6px 6px",
        backgroundRepeat: "no-repeat",
        paddingRight: "44px",
        cursor: "pointer",
    };

    return (
        <>
            <div className="bgc-thm4">
                <Header20 />

                <section className="our-register">
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-lg-6 m-auto wow fadeInUp"
                                data-wow-delay="300ms"
                            >
                                <div className="main-title text-center">
                                    <h2 className="title">Register</h2>
                                    <p className="paragraph">
                                        Give your visitor a smooth online
                                        experience with a solid UX design
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="row wow fadeInRight"
                            data-wow-delay="300ms"
                        >
                            <div className="col-xl-6 mx-auto">
                                <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                                    <div className="mb30">
                                        <h4>Let's create your account!</h4>
                                        <p className="text mt20">
                                            Already have an account?{" "}
                                            <Link
                                                href="/login"
                                                className="text-thm"
                                            >
                                                Log In!
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="mb25">
                                        <label className="form-label fw500 dark-color">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="mb25">
                                        <label className="form-label fw500 dark-color">
                                            Email or Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="example@gmail.com or +1 555 000 0000"
                                        />
                                    </div>
                                    <div className="mb25">
                                        <label className="form-label fw500 dark-color">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="*******"
                                        />
                                    </div>
                                    <div className="mb25">
                                        <label className="form-label fw500 dark-color">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="*******"
                                        />
                                    </div>
                                    <div className="mb15">
                                        <label className="form-label fw500 dark-color">
                                            Role Selection
                                        </label>
                                        <select
                                            className="form-control"
                                            style={roleSelectStyle}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select role
                                            </option>
                                            <option value="client">Client</option>
                                            <option value="worker">Worker</option>
                                            <option value="contractor">
                                                Contractor
                                            </option>
                                        </select>
                                    </div>
                                    <div className="d-grid mb20">
                                        <button
                                            className="ud-btn btn-thm default-box-shadow2"
                                            type="button"
                                        >
                                            Create Account{" "}
                                            <i className="fal fa-arrow-right-long" />
                                        </button>
                                    </div>
                                    <div className="hr_content mb20">
                                        <hr />
                                        <span className="hr_top_text">OR</span>
                                    </div>
                                    <div className="d-md-flex justify-content-between">
                                        <button
                                            className="ud-btn btn-fb fz14 fw400 mb-2 mb-md-0"
                                            type="button"
                                        >
                                            <i className="fab fa-facebook-f pr10" />{" "}
                                            Continue Facebook
                                        </button>
                                        <button
                                            className="ud-btn btn-google fz14 fw400 mb-2 mb-md-0"
                                            type="button"
                                        >
                                            <i className="fab fa-google" />{" "}
                                            Continue Google
                                        </button>
                                        <button
                                            className="ud-btn btn-apple fz14 fw400"
                                            type="button"
                                        >
                                            <i className="fab fa-apple" />{" "}
                                            Continue Apple
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}

"use client";

import { useState } from "react";
import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/modules/shared/utils/api";
import { USER_ROLES } from "@/modules/shared/utils/taskStates";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [selectedRole, setSelectedRole] = useState(USER_ROLES.CLIENT);
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        if (!formData.name || !formData.email || !formData.password) {
            setErrorText("Please fill in all required fields");
            return;
        }
        setLoading(true);
        setErrorText("");
        try {
            const result = await api.auth.register({
                ...formData,
                role: selectedRole,
            });
            if (result.success) {
                switch (selectedRole) {
                    case USER_ROLES.CLIENT:
                        router.push("/client-dashboard");
                        break;
                    case USER_ROLES.WORKER:
                        router.push("/worker-dashboard");
                        break;
                    case USER_ROLES.CONTRACTOR:
                        router.push("/contractor-dashboard");
                        break;
                    default:
                        router.push("/dashboard");
                }
            }
        } catch (error) {
            setErrorText("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
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
                                        Create your VeriTask account
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
                                        <h4>Create your account!</h4>
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

                                    <div className="role-selector mb25">
                                        <label className="form-label fw500 dark-color">
                                            I want to
                                        </label>
                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className={`role-btn flex-fill ${selectedRole === USER_ROLES.CLIENT ? 'active' : ''}`}
                                                onClick={() => setSelectedRole(USER_ROLES.CLIENT)}
                                            >
                                                <i className="flaticon-briefcase d-block mb5 fz20" />
                                                <span className="d-block fw600">Post Tasks</span>
                                                <span className="d-block fz12">Hire workers</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={`role-btn flex-fill ${selectedRole === USER_ROLES.WORKER ? 'active' : ''}`}
                                                onClick={() => setSelectedRole(USER_ROLES.WORKER)}
                                            >
                                                <i className="flaticon-user d-block mb5 fz20" />
                                                <span className="d-block fw600">Work</span>
                                                <span className="d-block fz12">Earn money</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={`role-btn flex-fill ${selectedRole === USER_ROLES.CONTRACTOR ? 'active' : ''}`}
                                                onClick={() => setSelectedRole(USER_ROLES.CONTRACTOR)}
                                            >
                                                <i className="flaticon-users d-block mb5 fz20" />
                                                <span className="d-block fw600">Lead Team</span>
                                                <span className="d-block fz12">Manage projects</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb25">
                                        <label className="form-label fw500 dark-color">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Jimmy Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb25">
                                        <label className="form-label fw500 dark-color">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="JimmyDoe"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb25">
                                        <label className="form-label fw500 dark-color">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="example@gmail.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb15">
                                        <label className="form-label fw500 dark-color">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="*******"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {errorText && (
                                        <p className="text-danger mb20">{errorText}</p>
                                    )}

                                    <div className="d-grid mb20">
                                        <button
                                            className="ud-btn btn-thm default-box-shadow2"
                                            type="button"
                                            onClick={handleRegister}
                                            disabled={loading}
                                        >
                                            {loading ? "Creating Account..." : "Create Account"}
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
                                            <i className="fab fa-facebook-f pr10" />
                                            Continue Facebook
                                        </button>
                                        <button
                                            className="ud-btn btn-google fz14 fw400 mb-2 mb-md-0"
                                            type="button"
                                        >
                                            <i className="fab fa-google" />
                                            Continue Google
                                        </button>
                                        <button
                                            className="ud-btn btn-apple fz14 fw400"
                                            type="button"
                                        >
                                            <i className="fab fa-apple" />
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

            <style jsx>{`
                .role-btn {
                    padding: 15px 10px;
                    border: 2px solid #e0e0e0;
                    border-radius: 12px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 14px;
                    color: #333;
                    text-align: center;
                }
                .role-btn:hover {
                    border-color: #37047C;
                }
                .role-btn.active {
                    border-color: #37047C;
                    background: #37047C;
                    color: white;
                }
                .role-btn.active i {
                    color: white;
                }
                .role-btn.active span {
                    color: white;
                }
            `}</style>
        </>
    );
}

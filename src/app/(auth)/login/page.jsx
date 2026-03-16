"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";
import Header20 from "@/components/header/Header20";
import Link from "next/link";
import {
    authenticateMockUser,
    getAuthSession,
    getMockUsers,
    getRoleFlow,
    setAuthSession,
} from "@/utils/auth/mockAuth";

export default function Page() {
    const router = useRouter();
    const demoUsers = getMockUsers();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [forgotStep, setForgotStep] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const otpRefs = useRef([]);

    const isOtpComplete = useMemo(() => otp.every((digit) => digit.length === 1), [otp]);


    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (forgotStep === 2) {
            otpRefs.current[0]?.focus();
        }
    }, [forgotStep]);

    useEffect(() => {
        const existingSession = getAuthSession();
        if (!existingSession?.role) return;

        const existingFlow = getRoleFlow(existingSession.role);
        if (existingFlow?.dashboardPath) {
            router.replace(existingFlow.dashboardPath);
        }
    }, [router]);

    const openForgotModal = () => {
        setForgotStep(1);
        setEmail("");
        setOtp(["", "", "", ""]);
        setNewPassword("");
        setConfirmPassword("");
        setErrorText("");
    };

    const closeForgotModal = () => {
        setForgotStep(0);
        setErrorText("");
    };

    const handleSendCode = () => {
        const isEmailValid = /^\S+@\S+\.\S+$/.test(email.trim());
        if (!isEmailValid) {
            setErrorText("Please enter a valid email address.");
            return;
        }
        setOtp(["", "", "", ""]);
        setErrorText("");
        setForgotStep(2);
    };

    const handleOtpChange = (index, value) => {
        const nextValue = value.replace(/\D/g, "").slice(0, 1);
        const updatedOtp = [...otp];
        updatedOtp[index] = nextValue;
        setOtp(updatedOtp);

        if (nextValue && index < 3) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleProceedToReset = () => {
        if (!isOtpComplete) {
            setErrorText("Please enter the full 4-digit code.");
            return;
        }
        setErrorText("");
        setForgotStep(3);
    };

    const handleUpdatePassword = () => {
        if (newPassword.length < 6) {
            setErrorText("Password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorText("Passwords do not match.");
            return;
        }

        setErrorText("");
        closeForgotModal();
    };

    const handleLogin = () => {
        if (!loginEmail.trim() || !loginPassword.trim()) {
            setLoginError("Please enter email and password.");
            return;
        }

        const user = authenticateMockUser(loginEmail, loginPassword);
        if (!user) {
            setLoginError("Invalid credentials. Use demo users listed below.");
            return;
        }

        setLoginError("");
        setAuthSession(user);

        const flow = getRoleFlow(user.role);
        router.push(flow?.dashboardPath || "/");
    };

    return (
        <>
            <div className="bgc-thm4">
                <Header20 />
                <section className="our-login">
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-lg-6 m-auto wow fadeInUp"
                                data-wow-delay="300ms"
                            >
                                <div className="main-title text-center">
                                    <h2 className="title">Log In</h2>
                                    <p className="paragraph">
                                        Access your account to manage jobs, projects, and opportunities.
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
                                        <h4>We're glad to see you again!</h4>
                                        <p className="text">
                                            Don't have an account?{" "}
                                            <Link
                                                href="/register"
                                                className="text-thm"
                                            >
                                                Sign Up!
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="mb20">
                                        <label className="form-label fw600 dark-color">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="example@gmail.com"
                                            value={loginEmail}
                                            onChange={(event) => setLoginEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb15">
                                        <label className="form-label fw600 dark-color">
                                            Password
                                        </label>

                                        <div style={{ position: "relative" }}>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                placeholder="*******"
                                                value={loginPassword}
                                                onChange={(event) => setLoginPassword(event.target.value)}
                                            />

                                            <i
                                                className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: "absolute",
                                                    right: "15px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    cursor: "pointer",
                                                    color: "#666"
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
                                        <button
                                            type="button"
                                            className="fz14 ff-heading p-0 border-0 bg-transparent"
                                            onClick={openForgotModal}
                                        >
                                            Lost your password?
                                        </button>
                                    </div>
                                    <div className="d-grid mb20">
                                        <button
                                            className="ud-btn btn-thm"
                                            type="button"
                                            onClick={handleLogin}
                                        >
                                            Log In{" "}
                                            <i className="fal fa-arrow-right-long" />
                                        </button>
                                    </div>
                                    {loginError && (
                                        <p className="mb20" style={{ color: "#d93025", fontWeight: 500 }}>
                                            {loginError}
                                        </p>
                                    )}
                                    {/* <div className="mb20">
                                        <p className="mb10 fw600 dark-color">Demo Users</p>
                                        <ul className="mb0 ps-3">
                                            {demoUsers.map((user) => (
                                                <li key={user.id} className="fz14">
                                                    {user.role}: {user.email} / {user.password}
                                                </li>
                                            ))}
                                        </ul>
                                    </div> */}
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

            {forgotStep > 0 && (
                <div
                    role="dialog"
                    aria-modal="true"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                    }}
                    onClick={closeForgotModal}
                >
                    <div
                        className="form-style1 bgc-white p30 bdrs12"
                        style={{ maxWidth: "460px", width: "100%" }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="d-flex align-items-center justify-content-between mb15">
                            <h4 className="mb-0">
                                {forgotStep === 1 && "Forgot Password"}
                                {forgotStep === 2 && "Verify OTP"}
                                {forgotStep === 3 && "Create New Password"}
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={closeForgotModal}
                            />
                        </div>

                        {forgotStep === 1 && (
                            <>
                                <p className="text mb20">Enter your email address and click Next.</p>
                                <div className="mb20">
                                    <label className="form-label fw600 dark-color">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <button type="button" className="ud-btn btn-thm w-100" onClick={handleSendCode}>
                                    Next <i className="fal fa-arrow-right-long" />
                                </button>
                            </>
                        )}

                        {forgotStep === 2 && (
                            <>
                                <p className="text mb20">Enter the 4-digit code sent to {email || "your email"}.</p>
                                <div className="d-flex gap-2 mb20">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            inputMode="numeric"
                                            className="form-control text-center"
                                            style={{ maxWidth: "90px" }}
                                            value={digit}
                                            ref={(element) => {
                                                otpRefs.current[index] = element;
                                            }}
                                            onChange={(event) => handleOtpChange(index, event.target.value)}
                                            onKeyDown={(event) => handleOtpKeyDown(index, event)}
                                        />
                                    ))}
                                </div>
                                <button type="button" className="ud-btn btn-thm w-100" onClick={handleProceedToReset}>
                                    Proceed <i className="fal fa-arrow-right-long" />
                                </button>
                            </>
                        )}

                        {forgotStep === 3 && (
                            <>
                                <p className="text mb20">Set your new password.</p>
                                <div className="mb15">
                                    <label className="form-label fw600 dark-color">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </div>
                                <div className="mb20">
                                    <label className="form-label fw600 dark-color">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </div>
                                <button type="button" className="ud-btn btn-thm w-100" onClick={handleUpdatePassword}>
                                    Change Password <i className="fal fa-arrow-right-long" />
                                </button>
                            </>
                        )}

                        {errorText && (
                            <p className="mt15 mb-0" style={{ color: "#d93025", fontWeight: 500 }}>
                                {errorText}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

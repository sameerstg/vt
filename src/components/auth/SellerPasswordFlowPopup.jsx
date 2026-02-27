"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function SellerPasswordFlowPopup({
  triggerClassName = "fz14 ff-heading p-0 border-0 bg-transparent",
  triggerLabel = "Lost your password?",
}) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const otpRefs = useRef([]);

  const isOtpComplete = useMemo(() => otp.every((digit) => digit.length === 1), [otp]);

  useEffect(() => {
    if (step === 2) {
      otpRefs.current[0]?.focus();
    }
  }, [step]);

  const openModal = () => {
    setStep(1);
    setEmail("");
    setOtp(["", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setErrorText("");
  };

  const closeModal = () => {
    setStep(0);
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
    setStep(2);
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
    setStep(3);
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
    closeModal();
  };

  return (
    <>
      <button type="button" className={triggerClassName} onClick={openModal}>
        {triggerLabel}
      </button>

      {step > 0 && (
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
          onClick={closeModal}
        >
          <div
            className="form-style1 bgc-white p30 bdrs12"
            style={{ maxWidth: "460px", width: "100%" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="d-flex align-items-center justify-content-between mb15">
              <h4 className="mb-0">
                {step === 1 && "Forgot Password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Create New Password"}
              </h4>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>

            {step === 1 && (
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

            {step === 2 && (
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
                <button
                  type="button"
                  className="ud-btn btn-thm w-100"
                  onClick={handleProceedToReset}
                >
                  Proceed <i className="fal fa-arrow-right-long" />
                </button>
              </>
            )}

            {step === 3 && (
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
                <button
                  type="button"
                  className="ud-btn btn-thm w-100"
                  onClick={handleUpdatePassword}
                >
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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getRoleFlow,
  registerMockUser,
  setAuthSession,
} from "@/utils/auth/mockAuth";

const ALLOWED_ROLES = ["client", "worker", "contractor"];

export default function WorkerContractorRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState("client");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const roleFromQuery = (searchParams.get("role") || "").toLowerCase();
    if (ALLOWED_ROLES.includes(roleFromQuery)) {
      setRole(roleFromQuery);
      return;
    }
    setRole("client");
  }, [searchParams]);

  const addToast = (type, message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const validate = () => {
    const errors = {};
    if (!role) errors.role = "Please select a role.";
    if (!fullName.trim()) errors.fullName = "Full name is required.";
    if (!email.trim()) errors.email = "Email address is required.";
    if (!password) errors.password = "Password is required.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      addToast("error", "Please correct the errors in the form.");
      return;
    }

    const result = await registerMockUser({
      name: fullName,
      email,
      phone,
      password,
      role,
    });

    if (!result.ok) {
      setFieldErrors((prev) => ({ ...prev, email: result.message }));
      addToast("error", result.message);
      return;
    }

    setAuthSession(result.user);
    addToast("success", "Registration successful. Redirecting to dashboard...");

    const flow = getRoleFlow(result.user.role);
    setTimeout(() => {
      router.push(flow?.dashboardPath || "/seller/login");
    }, 600);
  };

  const inputClass = (name) =>
    `form-control${fieldErrors[name] ? " border-danger" : ""}`;
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
  const passwordInputStyle = { paddingRight: "46px" };

  return (
    <>
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1100,
          width: "min(360px, calc(100vw - 40px))",
        }}
      >
        {toasts.map((toast) => {
          const styles = {
            success: { bg: "#e8f8ee", border: "#9dd8b5", color: "#14532d" },
            error: { bg: "#fdecec", border: "#f6b0b0", color: "#7f1d1d" },
            info: { bg: "#e8f1ff", border: "#a8c5ff", color: "#1e3a8a" },
          };
          const currentStyle = styles[toast.type] || styles.info;
          return (
            <div
              key={toast.id}
              style={{
                background: currentStyle.bg,
                border: `1px solid ${currentStyle.border}`,
                color: currentStyle.color,
                borderRadius: "10px",
                padding: "12px 14px",
                marginBottom: "10px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {toast.message}
            </div>
          );
        })}
      </div>

      <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
        <div className="mb30">
          <h4>Worker / Contractor Onboarding</h4>
          <p className="text mt20">
            Already have an account?{" "}
            <Link href="/seller/login" className="text-thm">
              Log In
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb20">
            <label className="form-label fw500 dark-color">Full Name</label>
            <input
              type="text"
              className={inputClass("fullName")}
              placeholder="John Doe"
              value={fullName}
              maxLength={60}
              onChange={(e) => setFullName(e.target.value)}
            />
            {fieldErrors.fullName && (
              <small className="text-danger d-block mt5">
                {fieldErrors.fullName}
              </small>
            )}
          </div>

          <div className="mb20">
            <label className="form-label fw500 dark-color">Email Address</label>
            <input
              type="email"
              className={inputClass("email")}
              placeholder="example@gmail.com"
              value={email}
              maxLength={120}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors.email && (
              <small className="text-danger d-block mt5">
                {fieldErrors.email}
              </small>
            )}
          </div>

          <div className="mb20">
            <label className="form-label fw500 dark-color">Phone Number</label>
            <input
              type="tel"
              className={inputClass("phone")}
              placeholder="+1 555 000 0000"
              value={phone}
              maxLength={20}
              onChange={(e) => setPhone(e.target.value)}
            />
            {fieldErrors.phone && (
              <small className="text-danger d-block mt5">
                {fieldErrors.phone}
              </small>
            )}
          </div>

          <div className="mb20">
            <label className="form-label fw500 dark-color">Role</label>
            <select
              className={inputClass("role")}
              style={roleSelectStyle}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="client">Client</option>
              <option value="worker">Worker</option>
              <option value="contractor">Contractor</option>
            </select>
            {fieldErrors.role && (
              <small className="text-danger d-block mt5">
                {fieldErrors.role}
              </small>
            )}
          </div>

          <div className="mb20">
            <label className="form-label fw500 dark-color">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className={inputClass("password")}
                style={passwordInputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="position-absolute top-50 end-0 translate-middle-y me-3 p-0 border-0 bg-transparent"
                style={{ color: "#6b7280", lineHeight: 1 }}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={showPassword ? "far fa-eye-slash" : "far fa-eye"}
                  aria-hidden="true"
                />
              </button>
            </div>
            {fieldErrors.password && (
              <small className="text-danger d-block mt5">
                {fieldErrors.password}
              </small>
            )}
          </div>

          <div className="mb20">
            <label className="form-label fw500 dark-color">
              Confirm Password
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={inputClass("confirmPassword")}
                style={passwordInputStyle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="position-absolute top-50 end-0 translate-middle-y me-3 p-0 border-0 bg-transparent"
                style={{ color: "#6b7280", lineHeight: 1 }}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                }
              >
                <i
                  className={showConfirmPassword ? "far fa-eye-slash" : "far fa-eye"}
                  aria-hidden="true"
                />
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <small className="text-danger d-block mt5">
                {fieldErrors.confirmPassword}
              </small>
            )}
          </div>

          <div className="text-center">
            <button className="btn btn-thm" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

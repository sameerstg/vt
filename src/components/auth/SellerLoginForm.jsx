"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SellerPasswordFlowPopup from "@/components/auth/SellerPasswordFlowPopup";
import {
  authenticateMockUser,
  getAuthSession,
  getMockUsers,
  getRoleFlow,
  setAuthSession,
} from "@/utils/auth/mockAuth";

export default function SellerLoginForm() {
  const router = useRouter();
  const demoUsers = getMockUsers();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const existingSession = getAuthSession();
    if (!existingSession?.role) return;

    const existingFlow = getRoleFlow(existingSession.role);
    if (existingFlow?.dashboardPath) {
      router.replace(existingFlow.dashboardPath);
    }
  }, [router]);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setErrorText("Please enter email and password.");
      return;
    }

    const user = authenticateMockUser(email, password);
    if (!user) {
      setErrorText("Invalid credentials. Use demo users listed below.");
      return;
    }

    setAuthSession(user);
    const flow = getRoleFlow(user.role);
    router.push(flow?.dashboardPath || "/");
  };

  return (
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="mb15">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="*******"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20">
        <SellerPasswordFlowPopup />
      </div>

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="button" onClick={handleLogin}>
          Log In <i className="fal fa-arrow-right-long" />
        </button>
      </div>

      {errorText && (
        <p className="mb20" style={{ color: "#d93025", fontWeight: 500 }}>
          {errorText}
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
  );
}

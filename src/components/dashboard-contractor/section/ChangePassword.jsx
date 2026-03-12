"use client";

import { useEffect, useState } from "react";
import {
  changeMockUserPassword,
  getAuthSession,
  getMockUsers,
} from "@/utils/auth/mockAuth";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const session = getAuthSession();
    if (!session?.email) return;

    const currentUser = getMockUsers().find(
      (user) => String(user.email || "").toLowerCase() === String(session.email || "").toLowerCase()
    );

    if (!currentUser?.password) return;

    setForm((current) => ({
      ...current,
      oldPassword: currentUser.password,
    }));
  }, []);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleVisibility = (field) => {
    setVisibility((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const oldPassword = form.oldPassword.trim();
    const newPassword = form.newPassword.trim();
    const confirmPassword = form.confirmPassword.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All password fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await changeMockUserPassword({
      currentPassword: oldPassword,
      newPassword,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.message || "Failed to change password.");
      return;
    }

    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setMessage("Password updated successfully.");
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Change password</h5>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <form className="form-style1" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Old Password
                    </label>
                    <div className="password-field">
                      <input
                        type={visibility.oldPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="********"
                        value={form.oldPassword}
                        onChange={(event) => handleChange("oldPassword", event.target.value)}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => toggleVisibility("oldPassword")}
                      >
                        <i className={visibility.oldPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      New Password
                    </label>
                    <div className="password-field">
                      <input
                        type={visibility.newPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="********"
                        value={form.newPassword}
                        onChange={(event) => handleChange("newPassword", event.target.value)}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => toggleVisibility("newPassword")}
                      >
                        <i className={visibility.newPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Confirm New Password
                    </label>
                    <div className="password-field">
                      <input
                        type={visibility.confirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="********"
                        value={form.confirmPassword}
                        onChange={(event) => handleChange("confirmPassword", event.target.value)}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => toggleVisibility("confirmPassword")}
                      >
                        <i className={visibility.confirmPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="col-md-12">
                    <p className="text-danger mb15">{error}</p>
                  </div>
                )}
                {message && (
                  <div className="col-md-12">
                    <p className="text-success mb15">{message}</p>
                  </div>
                )}
                <div className="col-md-12">
                  <div className="text-start">
                    <button className="ud-btn btn-thm" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Change Password"}
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .password-field {
          position: relative;
        }

        .password-field .form-control {
          padding-right: 48px;
        }

        .password-toggle {
          position: absolute;
          top: 50%;
          right: 14px;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #6b7280;
          padding: 0;
          line-height: 1;
        }
      `}</style>
    </>
  );
}

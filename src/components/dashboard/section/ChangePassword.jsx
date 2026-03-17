"use client";

import { useEffect, useState } from "react";
import {
  changeMockUserPassword,
  getAuthSession,
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

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

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

    setSuccessMessage("Your password has been updated successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">

        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Change Password</h5>
        </div>

        {successMessage && (
          <div className="alert alert-success mb20">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="alert alert-danger mb20">
            {error}
          </div>
        )}

        <div className="col-lg-7">
          <form className="form-style1" onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color fw500 mb10">
                    Old Password
                  </label>

                  <div className="password-field">
                    <input
                      type={visibility.oldPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="********"
                      value={form.oldPassword}
                      onChange={(e) =>
                        handleChange("oldPassword", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => toggleVisibility("oldPassword")}
                    >
                      <i
                        className={
                          visibility.oldPassword
                            ? "fas fa-eye-slash"
                            : "fas fa-eye"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color fw500 mb10">
                    New Password
                  </label>

                  <div className="password-field">
                    <input
                      type={visibility.newPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="********"
                      value={form.newPassword}
                      onChange={(e) =>
                        handleChange("newPassword", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => toggleVisibility("newPassword")}
                    >
                      <i
                        className={
                          visibility.newPassword
                            ? "fas fa-eye-slash"
                            : "fas fa-eye"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color fw500 mb10">
                    Confirm New Password
                  </label>

                  <div className="password-field">
                    <input
                      type={visibility.confirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="********"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => toggleVisibility("confirmPassword")}
                    >
                      <i
                        className={
                          visibility.confirmPassword
                            ? "fas fa-eye-slash"
                            : "fas fa-eye"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <button
                  className="ud-btn btn-thm"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Change Password"}
                  <i className="fal fa-arrow-right-long" />
                </button>
              </div>

            </div>
          </form>
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
        }
      `}</style>
    </>
  );
}
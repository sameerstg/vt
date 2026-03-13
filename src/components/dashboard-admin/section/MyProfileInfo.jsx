"use client";

import { useEffect, useState } from "react";

const defaultProfileForm = {
  fullName: "Alex Howl",
  email: "alex.howl@veritask.com",
  phone: "+92 300 1234567",
  role: "Admin Agent",
  location: "Karachi, Pakistan",
  bio: "Admin operations and compliance review for worker and contractor onboarding.",
};

const defaultPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function MyProfileInfo() {
  const [profileForm, setProfileForm] = useState(defaultProfileForm);
  const [passwordForm, setPasswordForm] = useState(defaultPasswordForm);
  const [profilePhoto, setProfilePhoto] = useState("/images/testimonials/testi-1.png");
  const [profilePhotoFile, setProfilePhotoFile] = useState("testi-1.png");
  const [tempPhotoUrl, setTempPhotoUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (tempPhotoUrl) {
        URL.revokeObjectURL(tempPhotoUrl);
      }
    };
  }, [tempPhotoUrl]);

  const handleProfileField = (field, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordField = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file (JPG, PNG, JPEG).");
      setSuccessMessage("");
      return;
    }

    if (tempPhotoUrl) {
      URL.revokeObjectURL(tempPhotoUrl);
    }

    const nextUrl = URL.createObjectURL(file);
    setTempPhotoUrl(nextUrl);
    setProfilePhoto(nextUrl);
    setProfilePhotoFile(file.name);
    setSuccessMessage("Profile photo selected. Click Save Profile to keep changes.");
    setErrorMessage("");
  };

  const resetProfilePhoto = () => {
    if (tempPhotoUrl) {
      URL.revokeObjectURL(tempPhotoUrl);
      setTempPhotoUrl("");
    }
    setProfilePhoto("/images/testimonials/testi-1.png");
    setProfilePhotoFile("testi-1.png");
    setSuccessMessage("Profile photo reset to default.");
    setErrorMessage("");
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("Profile data updated successfully.");
    setErrorMessage("");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setErrorMessage("Please fill current, new, and confirm password fields.");
      setSuccessMessage("");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters.");
      setSuccessMessage("");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage("Confirm password does not match new password.");
      setSuccessMessage("");
      return;
    }

    setPasswordForm(defaultPasswordForm);
    setSuccessMessage("Password changed successfully.");
    setErrorMessage("");
  };

  return (
    <div className="dashboard__content hover-bgc-color admin-my-profile-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Profile</h2>
            <p className="text">
              Update profile data, profile picture, and account password settings.
            </p>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              {successMessage}
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-danger mb30" role="alert">
              {errorMessage}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb25">
              <h5 className="list-title mb-0">Profile Data</h5>
            </div>

            <form className="form-style1" onSubmit={handleProfileSubmit}>
              <div className="row g-4">
                <div className="col-xl-4 col-lg-5">
                  <div className="profile-photo-panel">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="profile-photo-preview"
                      src={profilePhoto}
                      alt="Profile preview"
                    />
                    <p className="profile-photo-file mb10">{profilePhotoFile}</p>
                    <label className="ud-btn btn-thm-border profile-photo-btn mb10">
                      Change Photo
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        className="d-none"
                        onChange={handleProfilePhotoChange}
                      />
                    </label>
                    <button
                      type="button"
                      className="ud-btn btn-thm-border profile-photo-btn profile-photo-reset"
                      onClick={resetProfilePhoto}
                    >
                      Remove Photo
                    </button>
                    <p className="text mt10 mb-0">
                      JPG/PNG only, max 1MB recommended.
                    </p>
                  </div>
                </div>

                <div className="col-xl-8 col-lg-7">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileForm.fullName}
                          onChange={(event) =>
                            handleProfileField("fullName", event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={profileForm.email}
                          onChange={(event) =>
                            handleProfileField("email", event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileForm.phone}
                          onChange={(event) =>
                            handleProfileField("phone", event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Role
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileForm.role}
                          onChange={(event) =>
                            handleProfileField("role", event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Location
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileForm.location}
                          onChange={(event) =>
                            handleProfileField("location", event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Bio
                        </label>
                        <textarea
                          rows={5}
                          className="form-control"
                          value={profileForm.bio}
                          onChange={(event) =>
                            handleProfileField("bio", event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="ud-btn btn-thm">
                        Save Profile
                        <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb25">
              <h5 className="list-title mb-0">Change Password</h5>
            </div>

            <form className="form-style1" onSubmit={handlePasswordSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.currentPassword}
                      onChange={(event) =>
                        handlePasswordField("currentPassword", event.target.value)
                      }
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.newPassword}
                      onChange={(event) =>
                        handlePasswordField("newPassword", event.target.value)
                      }
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.confirmPassword}
                      onChange={(event) =>
                        handlePasswordField("confirmPassword", event.target.value)
                      }
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="ud-btn btn-thm">
                    Update Password
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-my-profile-page :global(.ps-widget) {
          border: 1px solid #e8edf6;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
        }

        .profile-photo-panel {
          background: #fbfcff;
          border: 1px solid #e8edf6;
          border-radius: 12px;
          height: 100%;
          padding: 16px;
          text-align: center;
        }

        .profile-photo-preview {
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
          display: block;
          height: 140px;
          margin: 0 auto 12px;
          object-fit: cover;
          width: 140px;
        }

        .profile-photo-file {
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          word-break: break-word;
        }

        .profile-photo-btn {
          display: inline-flex;
          justify-content: center;
          min-width: 150px;
          width: 100%;
        }

        .profile-photo-reset {
          border-color: #e04b4b;
          color: #e04b4b;
        }

        .profile-photo-reset:hover {
          background: #e04b4b;
          color: #ffffff;
        }

        @media (max-width: 991px) {
          .profile-photo-panel {
            margin-bottom: 8px;
          }

          .profile-photo-preview {
            height: 120px;
            width: 120px;
          }
        }
      `}</style>
    </div>
  );
}

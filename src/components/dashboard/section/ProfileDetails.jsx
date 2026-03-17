"use client";
import React, { useEffect, useMemo, useState } from "react";
import SelectInput from "../option/SelectInput";
import Image from "next/image";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
  saveMockUserProfile,
} from "@/utils/auth/mockAuth";

const hourlyOptions = [
  { option: "$50", value: "50" },
  { option: "$60", value: "60" },
  { option: "$70", value: "70" },
  { option: "$80", value: "80" },
  { option: "$90", value: "90" },
  { option: "$100", value: "100" },
];

const genderOptions = [
  { option: "Male", value: "male" },
  { option: "Female", value: "female" },
  { option: "Other", value: "other" },
];

const countryOptions = [
  { option: "United States", value: "usa" },
  { option: "Canada", value: "canada" },
  { option: "United Kingdom", value: "uk" },
  { option: "Australia", value: "australia" },
  { option: "Germany", value: "germany" },
  { option: "Japan", value: "japan" },
];

const cityOptions = [
  { option: "New York", value: "new-york" },
  { option: "Toronto", value: "toronto" },
  { option: "London", value: "london" },
  { option: "Sydney", value: "sydney" },
  { option: "Berlin", value: "berlin" },
  { option: "Tokyo", value: "tokyo" },
];

const languageOptions = [
  { option: "English", value: "english" },
  { option: "French", value: "french" },
  { option: "German", value: "german" },
  { option: "Japanese", value: "japanese" },
];

const languageLevelOptions = [
  { option: "Beginner", value: "beginner" },
  { option: "Intermediate", value: "intermediate" },
  { option: "Advanced", value: "advanced" },
  { option: "Fluent", value: "fluent" },
];

const getSelectState = (value, options) => {
  const found = options.find((item) => item.value === value);
  return found || { option: "Select", value: null };
};

export default function ProfileDetails() {
  const [getHourly, setHourly] = useState({ option: "Select", value: null });
  const [getGender, setGender] = useState({ option: "Select", value: null });
  const [getCountry, setCountry] = useState({ option: "Select", value: null });
  const [getCity, setCity] = useState({ option: "Select", value: null });
  const [getLanguage, setLanguage] = useState({ option: "Select", value: null });
  const [getLanLevel, setLanLevel] = useState({ option: "Select", value: null });

  const [selectedImage, setSelectedImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    intro: "",
  });

  useEffect(() => {
    const syncSession = () => {
      const session = getAuthSession();
      if (!session) return;

      setFormData({
        username: session.name || "",
        email: session.email || "",
        phone: session.phone || "",
        intro: session.bio || "",
      });

      setHourly(getSelectState(session.hourlyRate || "", hourlyOptions));
      setGender(getSelectState(session.gender || "", genderOptions));
      setCountry(getSelectState(session.country || "", countryOptions));
      setCity(getSelectState(session.city || "", cityOptions));
      setLanguage(getSelectState(session.language || "", languageOptions));
      setLanLevel(
        getSelectState(session.languageLevel || "", languageLevelOptions)
      );

      setSelectedImage(session.profileImage || null);
    };

    syncSession();

    window.addEventListener("storage", syncSession);
    window.addEventListener(AUTH_SESSION_EVENT, syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(AUTH_SESSION_EVENT, syncSession);
    };
  }, []);

  const previewImage = useMemo(
    () => selectedImage || "/images/profile.jpg",
    [selectedImage]
  );

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = String(reader.result || "");
      if (!imageDataUrl) return;

      setSelectedImage(imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const onChangeField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const updates = {
      name: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      bio: formData.intro.trim(),
      hourlyRate: getHourly.value || "",
      gender: getGender.value || "",
      country: getCountry.value || "",
      city: getCity.value || "",
      language: getLanguage.value || "",
      languageLevel: getLanLevel.value || "",
      profileImage: selectedImage || "",
    };

    const result = await saveMockUserProfile(updates);

    if (!result.ok) {
      return;
    }

    setSuccessMessage("Your profile has been updated successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>

        {successMessage && (
          <div className="alert alert-success mb20">
            {successMessage}
          </div>
        )}

        <div className="col-xl-7">
          <div className="profile-box d-sm-flex align-items-center mb30">
            <div className="profile-img mb20-sm">
              <Image
                height={71}
                width={71}
                className="rounded-circle wa-xs"
                src={previewImage}
                style={{
                  height: "71px",
                  width: "71px",
                  objectFit: "cover",
                }}
                alt="profile"
              />
            </div>

            <div className="profile-content ml20 ml0-xs">
              <div className="d-flex align-items-center my-3">
                <label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                  <a className="upload-btn ml10">Upload Images</a>
                </label>
              </div>

              <p className="text mb-0">
                Max file size is 1MB, Minimum dimension: 330x300 And Suitable
                files are .jpg & .png
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <form className="form-style1" onSubmit={handleSave}>
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color fw500 mb10">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.username}
                    onChange={(e) =>
                      onChangeField("username", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color fw500 mb10">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => onChangeField("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color fw500 mb10">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => onChangeField("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color fw500 mb10">
                    Introduce Yourself
                  </label>

                  <textarea
                    cols={30}
                    rows={6}
                    className="form-control"
                    value={formData.intro}
                    onChange={(e) => onChangeField("intro", e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <button className="ud-btn btn-thm" type="submit">
                  Save
                  <i className="fal fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
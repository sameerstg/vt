"use client";
import React, { useEffect, useMemo, useState } from "react";
import SelectInput from "../option/SelectInput";
import Image from "next/image";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
  updateAuthSession,
} from "@/utils/auth/mockAuth";

export default function ProfileDetails() {
  const [getHourly, setHourly] = useState({
    option: "Select",
    value: null,
  });
  const [getGender, setGender] = useState({
    option: "Select",
    value: null,
  });
  const [getCountry, setCountry] = useState({
    option: "Select",
    value: null,
  });
  const [getCity, setCity] = useState({
    option: "Select",
    value: null,
  });
  const [getLanguage, setLanguage] = useState({
    option: "Select",
    value: null,
  });
  const [getLanLevel, setLanLevel] = useState({
    option: "Select",
    value: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    intro: "",
  });
  const [message, setMessage] = useState("");

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
      updateAuthSession({ profileImage: imageDataUrl });
      setMessage("Profile image updated.");
    };
    reader.readAsDataURL(file);
  };

  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    updateAuthSession({
      name: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      bio: formData.intro.trim(),
      profileImage: selectedImage || undefined,
    });

    setMessage("Profile details saved.");
  };

  // handlers
  const hourlyHandler = (option, value) => {
    setHourly({ option, value });
  };
  const genderHandler = (option, value) => {
    setGender({ option, value });
  };

  const countryHandler = (option, value) => {
    setCountry({ option, value });
  };
  const cityHandler = (option, value) => {
    setCity({ option, value });
  };
  const languageHandler = (option, value) => {
    setLanguage({ option, value });
  };
  const lanLevelHandler = (option, value) => {
    setLanLevel({ option, value });
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>
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
                <a
                  className="tag-delt text-thm2"
                  onClick={() => {
                    setSelectedImage("/images/profile.jpg");
                    updateAuthSession({ profileImage: "/images/profile.jpg" });
                    setMessage("Profile image reset.");
                  }}
                >
                  <span className="flaticon-delete text-thm2" />
                </a>
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
                files are .jpg &amp; .png
              </p>
              {message && <p className="text text-thm mt10 mb-0">{message}</p>}
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <form className="form-style1" onSubmit={handleSave}>
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.username}
                    onChange={(event) =>
                      onChangeField("username", event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(event) =>
                      onChangeField("email", event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    onChange={(event) =>
                      onChangeField("phone", event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Hourly Rate"
                    defaultSelect={getHourly}
                    data={[
                      { option: "$50", value: "50" },
                      { option: "$60", value: "60" },
                      { option: "$70", value: "70" },
                      { option: "$80", value: "80" },
                      { option: "$90", value: "90" },
                      { option: "$100", value: "100" },
                    ]}
                    handler={hourlyHandler}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Gender"
                    defaultSelect={getGender}
                    data={[
                      { option: "Male", value: "male" },
                      {
                        option: "Female",
                        value: "female",
                      },
                      { option: "Other", value: "other" },
                    ]}
                    handler={genderHandler}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Country"
                    defaultSelect={getCountry}
                    data={[
                      {
                        option: "United States",
                        value: "usa",
                      },
                      {
                        option: "Canada",
                        value: "canada",
                      },
                      {
                        option: "United Kingdom",
                        value: "uk",
                      },
                      {
                        option: "Australia",
                        value: "australia",
                      },
                      {
                        option: "Germany",
                        value: "germany",
                      },
                      { option: "Japan", value: "japan" },
                    ]}
                    handler={countryHandler}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="City"
                    defaultSelect={getCity}
                    data={[
                      {
                        option: "New York",
                        value: "new-york",
                      },
                      {
                        option: "Toronto",
                        value: "toronto",
                      },
                      {
                        option: "London",
                        value: "london",
                      },
                      {
                        option: "Sydney",
                        value: "sydney",
                      },
                      {
                        option: "Berlin",
                        value: "berlin",
                      },
                      { option: "Tokyo", value: "tokyo" },
                    ]}
                    handler={cityHandler}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Language"
                    defaultSelect={getLanguage}
                    data={[
                      {
                        option: "English",
                        value: "english",
                      },
                      {
                        option: "French",
                        value: "french",
                      },
                      {
                        option: "German",
                        value: "german",
                      },
                      {
                        option: "Japanese",
                        value: "japanese",
                      },
                    ]}
                    handler={languageHandler}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Languages Level"
                    defaultSelect={getLanLevel}
                    data={[
                      {
                        option: "Beginner",
                        value: "beginner",
                      },
                      {
                        option: "Intermediate",
                        value: "intermediate",
                      },
                      {
                        option: "Advanced",
                        value: "advanced",
                      },
                      {
                        option: "Fluent",
                        value: "fluent",
                      },
                    ]}
                    handler={lanLevelHandler}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Introduce Yourself
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    placeholder="Description"
                    value={formData.intro}
                    onChange={(event) =>
                      onChangeField("intro", event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="text-start">
                  <button className="ud-btn btn-thm" type="submit">
                    Save
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

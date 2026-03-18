import { useState, useEffect } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getTaskById, updateMockTask, getAuthSession } from "@/utils/auth/mockAuth";

export default function BasicInformation2() {
  const [getCategory, setCategory] = useState({
    option: "Select",
    value: "select",
  });
  const [getFreeType, setFreeType] = useState({
    option: "Select",
    value: "select",
  });
  const [getPriceType, setPriceType] = useState({
    option: "Select",
    value: "select",
  });
  const [getProjectDuration, setProjectDuration] = useState({
    option: "Select",
    value: "select",
  });
  const [getLevel, setLevel] = useState({
    option: "Select",
    value: "select",
  });
  const [getCountry, setCountry] = useState({
    option: "United States",
    value: "usa",
  });
  const [getCity, setCity] = useState({
    option: "New York",
    value: "new-york",
  });
  const [getLanguage, setLanguage] = useState({
    option: "Select",
    value: null,
  });
  const [getLanLevel, setLanLevel] = useState({
    option: "Select",
    value: null,
  });
  const [getSkill, setSkill] = useState({
    option: "Nothing selected",
    value: null,
  });
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [detail, setDetail] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("taskId");

  useEffect(() => {
    if (taskId) {
      const task = getTaskById(taskId);
      if (task) {
        setTitle(task.title || "");
        setCost(task.budget ? task.budget.replace(/[^0-9.]/g, "") : "");
        setDetail(task.detail || "");
        
        if (task.category) setCategory({ option: task.category, value: task.category.toLowerCase().replace(/ /g, "-") });
        // Add more mapping if necessary for other fields
      }
    }
  }, [taskId]);

  // handlers
  const categoryHandler = (option, value) => {
    setCategory({
      option,
      value,
    });
  };
  const freeTypeHandler = (option, value) => {
    setFreeType({
      option,
      value,
    });
  };
  const priceTypeHandler = (option, value) => {
    setPriceType({
      option,
      value,
    });
  };
  const projectDurationHandler = (option, value) => {
    setProjectDuration({
      option,
      value,
    });
  };
  const levelHandler = (option, value) => {
    setLevel({
      option,
      value,
    });
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
  const skillHandler = (option, value) => {
    setSkill({
      option,
      value,
    });
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Basic Information</h5>
        </div>
        <div className="col-xl-8">
          <form className="form-style1">
            <div className="row">
              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="i will"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Category"
                    defaultSelect={getCategory}
                    handler={categoryHandler}
                    data={[
                      {
                        option: "Select",
                        value: "select",
                      },
                      {
                        option: "Graphics & Design",
                        value: "graphics-design",
                      },
                      {
                        option: "Digital Marketing",
                        value: "digital-marketing",
                      },
                      {
                        option: "Writing & Translation",
                        value: "writing-translation",
                      },
                      {
                        option: "Video & Animation",
                        value: "video-animation",
                      },
                      {
                        option: "Music & Audio",
                        value: "music-audio",
                      },
                      {
                        option: "Programming & Tech",
                        value: "programming-tech",
                      },
                      {
                        option: "Business",
                        value: "business",
                      },
                      {
                        option: "Lifestyle",
                        value: "lifestyle",
                      },
                      {
                        option: "Trending",
                        value: "trending",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Freelancer Type"
                    defaultSelect={getFreeType}
                    handler={freeTypeHandler}
                    data={[
                      {
                        option: "Select",
                        value: "select",
                      },
                      {
                        option: "Full Time",
                        value: "full-time",
                      },
                      {
                        option: "Part Time",
                        value: "part-time",
                      },
                      {
                        option: "Project Based",
                        value: "project-base",
                      },
                      {
                        option: "Other",
                        value: "other",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Price type"
                    defaultSelect={getPriceType}
                    handler={priceTypeHandler}
                    data={[
                      {
                        option: "Select",
                        value: "select",
                      },
                      {
                        option: "Low($)",
                        value: "low",
                      },
                      {
                        option: "Mid($$)",
                        value: "mid",
                      },
                      {
                        option: "High($$$)",
                        value: "high",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Cost
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="$"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Project Duration"
                    defaultSelect={getProjectDuration}
                    handler={projectDurationHandler}
                    data={[
                      {
                        option: "Select",
                        value: "select",
                      },
                      {
                        option: "1 Day",
                        value: "1-day",
                      },
                      {
                        option: "2 Day",
                        value: "2-day",
                      },
                      {
                        option: "3 Day",
                        value: "3-day",
                      },
                      {
                        option: "1 Week",
                        value: "1-week",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Level"
                    defaultSelect={getLevel}
                    handler={levelHandler}
                    data={[
                      {
                        option: "Select",
                        value: "select",
                      },
                      {
                        option: "Entry Level",
                        value: "entry-level",
                      },
                      {
                        option: "Standard Level",
                        value: "standard-level",
                      },
                      {
                        option: "Expert Level",
                        value: "expert-level",
                      },
                    ]}
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
                      {
                        option: "Japan",
                        value: "japan",
                      },
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
                      {
                        option: "Tokyo",
                        value: "tokyo",
                      },
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
              <div className="col-sm-12">
                <div className="mb20">
                  <SelectInput
                    label="Skills"
                    defaultSelect={getSkill}
                    handler={skillHandler}
                    data={[
                      {
                        option: "Select",
                        value: "select",
                      },
                      {
                        option: "Figma",
                        value: "figma",
                      },
                      {
                        option: "Adobe XD",
                        value: "adobe-xd",
                      },
                      {
                        option: "CSS",
                        value: "css",
                      },
                      {
                        option: "HTML",
                        value: "html",
                      },
                      {
                        option: "Bootstrap",
                        value: "bootstrap",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Project Detail
                  </label>
                  <textarea 
                    cols={30} 
                    rows={6} 
                    placeholder="Description" 
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="text-start">
                  <button 
                    type="button"
                    className="ud-btn btn-thm" 
                    onClick={() => {
                      const updatedData = {
                        title,
                        budget: `$${cost}`,
                        detail,
                        category: getCategory.option,
                        // Add other fields as needed
                      };
                      if (taskId) {
                        const res = updateMockTask(taskId, updatedData);
                        if (res.ok) {
                          router.push("/dashboard/manage-projects");
                        } else {
                          alert(res.message);
                        }
                      } else {
                        // Handle new task creation logic if needed
                        alert("Create logic not implemented in this mock, use existing tasks to edit.");
                      }
                    }}
                  >
                    Save Changes
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

"use client";

import { useEffect, useState } from "react";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
  saveMockUserProfile,
} from "@/utils/auth/mockAuth";

const defaultExperience = [
  {
    id: "exp-1",
    role: "UX Designer",
    company: "Dropbox",
    startYear: "2012",
    endYear: "2014",
    description:
      "Worked on product experience, interface systems, and end-to-end user flows for web surfaces.",
  },
  {
    id: "exp-2",
    role: "Art Director",
    company: "Amazon",
    startYear: "2008",
    endYear: "2012",
    description:
      "Led visual direction, campaign execution, and digital storytelling across major customer touchpoints.",
  },
];

const createEmptyExperience = () => ({
  id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role: "",
  company: "",
  startYear: "",
  endYear: "",
  description: "",
});

function ensureExperience(items) {
  return Array.isArray(items) && items.length ? items : [createEmptyExperience()];
}

export default function WorkExperience() {
  const [experienceList, setExperienceList] = useState(defaultExperience);
  const [editingIds, setEditingIds] = useState([]);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      const session = getAuthSession();
      setExperienceList(
        Array.isArray(session?.workExperience) && session.workExperience.length
          ? session.workExperience
          : defaultExperience
      );
      setEditingIds([]);
    };

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener(AUTH_SESSION_EVENT, syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(AUTH_SESSION_EVENT, syncSession);
    };
  }, []);

  const handleFieldChange = (id, field, value) => {
    setExperienceList((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    const nextItem = createEmptyExperience();
    setExperienceList((current) => [...current, nextItem]);
    setEditingIds((current) => [...new Set([...current, nextItem.id])]);
    setMessage("");
  };

  const handleDelete = (id) => {
    setExperienceList((current) => ensureExperience(current.filter((item) => item.id !== id)));
    setEditingIds((current) => current.filter((itemId) => itemId !== id));
    setMessage("");
  };

  const toggleEdit = (id, shouldEdit) => {
    setEditingIds((current) =>
      shouldEdit ? [...new Set([...current, id])] : current.filter((itemId) => itemId !== id)
    );
  };

  const handleSave = async () => {
    const sanitizedExperience = experienceList
      .map((item) => ({
        ...item,
        role: item.role.trim(),
        company: item.company.trim(),
        startYear: item.startYear.trim(),
        endYear: item.endYear.trim(),
        description: item.description.trim(),
      }))
      .filter(
        (item) =>
          item.role ||
          item.company ||
          item.startYear ||
          item.endYear ||
          item.description
      );

    setIsSaving(true);
    setMessage("");

    const result = await saveMockUserProfile({
      workExperience: sanitizedExperience,
    });

    setIsSaving(false);

    if (!result.ok) {
      setMessage(result.message || "Work experience save failed.");
      return;
    }

    setExperienceList(ensureExperience(sanitizedExperience));
    setEditingIds([]);
    setMessage("Work experience saved.");
  };

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
      <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between align-items-center">
        <h5 className="list-title">Work &amp; Experience</h5>
        <button
          type="button"
          className="add-more-btn text-thm border-0 bg-transparent"
          onClick={handleAdd}
        >
          <i className="icon far fa-plus mr10" />
          Add Experience
        </button>
      </div>

      <div className="row g-4">
        {experienceList.map((item) => (
          <div className="col-xl-12" key={item.id}>
            {editingIds.includes(item.id) ? (
              <div className="record-editor">
                <div className="record-editor__head">
                  <span className="record-editor__badge">W</span>
                  <div className="record-editor__actions">
                    <button
                      type="button"
                      className="record-editor__done"
                      onClick={() => toggleEdit(item.id, false)}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="record-editor__delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="flaticon-delete" />
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.role}
                        onChange={(event) => handleFieldChange(item.id, "role", event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.company}
                        onChange={(event) => handleFieldChange(item.id, "company", event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">Start Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.startYear}
                        onChange={(event) => handleFieldChange(item.id, "startYear", event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">End Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={item.endYear}
                        onChange={(event) => handleFieldChange(item.id, "endYear", event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb0">
                      <label className="heading-color ff-heading fw500 mb10">Description</label>
                      <textarea
                        cols={30}
                        rows={5}
                        value={item.description}
                        onChange={(event) => handleFieldChange(item.id, "description", event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="record-card">
                <div className="record-card__actions">
                  <button
                    type="button"
                    className="record-card__icon"
                    onClick={() => toggleEdit(item.id, true)}
                  >
                    <span className="flaticon-pencil" />
                  </button>
                  <button
                    type="button"
                    className="record-card__icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <span className="flaticon-delete" />
                  </button>
                </div>
                <span className="tag">{item.startYear || "Start"} - {item.endYear || "Present"}</span>
                <h5 className="mt15">{item.role || "Role title"}</h5>
                <h6 className="text-thm">{item.company || "Company name"}</h6>
                <p className="mb-0">
                  {item.description || "Add responsibilities and work summary."}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-start mt30">
        <button type="button" className="ud-btn btn-thm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
          <i className="fal fa-arrow-right-long" />
        </button>
        {message && <p className="text text-thm mt15 mb-0">{message}</p>}
      </div>

      <style jsx>{`
        .record-editor {
          border: 1px solid #e8edf6;
          border-radius: 14px;
          padding: 20px;
          background: #fcfdff;
        }

        .record-editor__head,
        .record-editor__actions,
        .record-card__actions {
          display: flex;
          align-items: center;
        }

        .record-editor__head,
        .record-card__actions {
          justify-content: space-between;
        }

        .record-editor__actions,
        .record-card__actions {
          gap: 10px;
        }

        .record-editor__head {
          margin-bottom: 18px;
        }

        .record-editor__badge {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f4f0ff;
          color: #5b2dff;
          font-weight: 700;
        }

        .record-editor__delete {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid #eadfe0;
          background: #fff7f7;
          color: #c2410c;
        }

        .record-editor__done {
          border: 1px solid #dbe1ee;
          background: #ffffff;
          color: #334155;
          border-radius: 10px;
          padding: 8px 12px;
          font-weight: 600;
        }

        .record-card {
          position: relative;
          padding-right: 54px;
        }

        .record-card__actions {
          position: absolute;
          top: 0;
          right: 0;
        }

        .record-card__icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #fff1ec;
          border: 0;
          color: #0f4c5c;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        :global(.add-more-btn) {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }

        :global(.add-more-btn .icon) {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: #fff1ec;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 0 !important;
        }
      `}</style>
    </div>
  );
}

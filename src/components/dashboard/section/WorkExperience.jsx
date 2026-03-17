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

  
}

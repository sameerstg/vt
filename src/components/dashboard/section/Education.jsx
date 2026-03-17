"use client";

import { useEffect, useState } from "react";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
  saveMockUserProfile,
} from "@/utils/auth/mockAuth";

const createEmptyEducation = () => ({
  id: `edu-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  degree: "",
  institute: "",
  startYear: "",
  endYear: "",
  description: "",
});

function ensureEducation(items) {
  return Array.isArray(items) && items.length ? items : [createEmptyEducation()];
}

export default function Education() {
  const [educationList, setEducationList] = useState([createEmptyEducation()]);
  const [editingIds, setEditingIds] = useState([]);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      const session = getAuthSession();
      setEducationList(ensureEducation(session?.education));
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
    setEducationList((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    const nextItem = createEmptyEducation();
    setEducationList((current) => [...current, nextItem]);
    setEditingIds((current) => [...new Set([...current, nextItem.id])]);
    setMessage("");
  };

  const handleDelete = (id) => {
    setEducationList((current) => ensureEducation(current.filter((item) => item.id !== id)));
    setEditingIds((current) => current.filter((itemId) => itemId !== id));
    setMessage("");
  };

  const toggleEdit = (id, shouldEdit) => {
    setEditingIds((current) =>
      shouldEdit ? [...new Set([...current, id])] : current.filter((itemId) => itemId !== id)
    );
  };

  const handleSave = async () => {
    const sanitizedEducation = educationList
      .map((item) => ({
        ...item,
        degree: item.degree.trim(),
        institute: item.institute.trim(),
        startYear: item.startYear.trim(),
        endYear: item.endYear.trim(),
        description: item.description.trim(),
      }))
      .filter(
        (item) =>
          item.degree ||
          item.institute ||
          item.startYear ||
          item.endYear ||
          item.description
      );

    setIsSaving(true);
    setMessage("");

    const result = await saveMockUserProfile({ education: sanitizedEducation });

    setIsSaving(false);

    if (!result.ok) {
      setMessage(result.message || "Education save failed.");
      return;
    }

    setEducationList(ensureEducation(sanitizedEducation));
    setEditingIds([]);
    setMessage("Education saved.");
  };

  
}

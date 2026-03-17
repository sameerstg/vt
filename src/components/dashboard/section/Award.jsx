"use client";

import { useEffect, useState } from "react";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
  saveMockUserProfile,
} from "@/utils/auth/mockAuth";

const defaultAwards = [
  {
    id: "award-1",
    title: "UI UX Design",
    issuer: "Udemy",
    startYear: "2012",
    endYear: "2014",
    description:
      "Completed advanced product design training focused on interface systems and user-centered workflows.",
  },
  {
    id: "award-2",
    title: "App Design",
    issuer: "Google",
    startYear: "2008",
    endYear: "2012",
    description:
      "Recognized for mobile-first design thinking, interaction quality, and polished application design execution.",
  },
];

const createEmptyAward = () => ({
  id: `award-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: "",
  issuer: "",
  startYear: "",
  endYear: "",
  description: "",
});

function ensureAwards(items) {
  return Array.isArray(items) && items.length ? items : [createEmptyAward()];
}

export default function Award() {
  const [awards, setAwards] = useState(defaultAwards);
  const [editingIds, setEditingIds] = useState([]);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      const session = getAuthSession();
      setAwards(
        Array.isArray(session?.awards) && session.awards.length
          ? session.awards
          : defaultAwards
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
    setAwards((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    const nextItem = createEmptyAward();
    setAwards((current) => [...current, nextItem]);
    setEditingIds((current) => [...new Set([...current, nextItem.id])]);
    setMessage("");
  };

  const handleDelete = (id) => {
    setAwards((current) => ensureAwards(current.filter((item) => item.id !== id)));
    setEditingIds((current) => current.filter((itemId) => itemId !== id));
    setMessage("");
  };

  const toggleEdit = (id, shouldEdit) => {
    setEditingIds((current) =>
      shouldEdit ? [...new Set([...current, id])] : current.filter((itemId) => itemId !== id)
    );
  };

  const handleSave = async () => {
    const sanitizedAwards = awards
      .map((item) => ({
        ...item,
        title: item.title.trim(),
        issuer: item.issuer.trim(),
        startYear: item.startYear.trim(),
        endYear: item.endYear.trim(),
        description: item.description.trim(),
      }))
      .filter(
        (item) =>
          item.title ||
          item.issuer ||
          item.startYear ||
          item.endYear ||
          item.description
      );

    setIsSaving(true);
    setMessage("");

    const result = await saveMockUserProfile({ awards: sanitizedAwards });

    setIsSaving(false);

    if (!result.ok) {
      setMessage(result.message || "Awards save failed.");
      return;
    }

    setAwards(ensureAwards(sanitizedAwards));
    setEditingIds([]);
    setMessage("Awards saved.");
  };

 
}

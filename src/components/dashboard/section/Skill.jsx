"use client";

import React from "react";
import { useEffect, useState } from "react";
import SelectInput from "../option/SelectInput";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
  saveMockUserProfile,
} from "@/utils/auth/mockAuth";

const skillOptions = [
  { option: "Designer", value: "designer" },
  { option: "UI/UX", value: "ui-ux" },
  { option: "Developer", value: "developer" },
  { option: "Programmer", value: "programmer" },
  { option: "Video Editor", value: "video-editor" },
];

const pointOptions = [
  { option: "60", value: "60" },
  { option: "70", value: "70" },
  { option: "75", value: "75" },
  { option: "80", value: "80" },
  { option: "90", value: "90" },
];

const createEmptySkill = () => ({
  id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  skill: "",
  point: "",
});

const getSelectState = (value, options) => {
  const found = options.find((item) => item.value === value);
  return found || { option: "Select", value: null };
};

function ensureSkills(items) {
  const source = Array.isArray(items) ? items.slice(0, 3) : [];
  while (source.length < 3) {
    source.push(createEmptySkill());
  }
  return source;
}

export default function Skill() {
  const [skills, setSkills] = useState(ensureSkills([]));
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      const session = getAuthSession();
      setSkills(ensureSkills(session?.skills));
    };

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener(AUTH_SESSION_EVENT, syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(AUTH_SESSION_EVENT, syncSession);
    };
  }, []);

  const updateSkill = (id, field, value) => {
    setSkills((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);

    const sanitizedSkills = skills
      .map((item) => ({
        ...item,
        skill: item.skill || "",
        point: item.point || "",
      }))
      .filter((item) => item.skill || item.point);

    const result = await saveMockUserProfile({
      skills: sanitizedSkills,
    });

    setIsSaving(false);

    if (!result.ok) {
      setMessage(result.message || "Skills save failed.");
      return;
    }

    setSkills(ensureSkills(sanitizedSkills));
    setMessage("Skills saved.");
  };

  
}

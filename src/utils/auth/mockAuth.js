import mockUsers from "@/data/auth/mockUsers.json";
import roleFlows from "@/data/auth/roleFlows.json";

export const AUTH_SESSION_KEY = "vt_auth_session";
export const AUTH_SESSION_EVENT = "vt_auth_session_changed";
export const REGISTERED_USERS_KEY = "vt_registered_mock_users";
export const DEFAULT_PROFILE_IMAGE_BY_ROLE = {
  client: "/images/front-view-business-woman-suit_23-2148603018.jpg",
  worker: "/images/images.jpg",
  contractor: "/images/premium_photo-1688740375397-34605b6abe48.jpg",
  admin: "/images/portrait-white-man-isolated_53876-40306.jpg",
};

export function getGeneratedAvatarUrl(name = "User") {
  const seed = encodeURIComponent(String(name).trim() || "User");
  return `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${seed}&backgroundType=gradientLinear`;
}

export function getDefaultProfileImage(role = "") {
  return DEFAULT_PROFILE_IMAGE_BY_ROLE[role] || "/images/profile.jpg";
}

function getRegisteredUsers() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setRegisteredUsers(users) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function getAllUsers() {
  const registeredUsers = getRegisteredUsers();
  const merged = [...mockUsers, ...registeredUsers];
  const uniqueByEmail = new Map();

  merged.forEach((user) => {
    const key = String(user?.email || "").toLowerCase();
    if (!key) return;
    uniqueByEmail.set(key, user);
  });

  return Array.from(uniqueByEmail.values());
}

export function authenticateMockUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  return (
    getAllUsers().find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === normalizedPassword
    ) || null
  );
}

export async function registerMockUser({
  name,
  email,
  password,
  role,
  phone = "",
}) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getAllUsers();
  const existing = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail
  );

  if (existing) {
    return { ok: false, message: "Email already exists." };
  }

  try {
    const response = await fetch("/api/mock-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role,
        phone: phone.trim(),
      }),
    });

    const data = await response.json();
    if (!response.ok || !data?.ok || !data?.user) {
      return {
        ok: false,
        message: data?.message || "Failed to register user.",
      };
    }

    const registeredUsers = getRegisteredUsers();
    setRegisteredUsers([...registeredUsers, data.user]);
    return { ok: true, user: data.user };
  } catch {
    return { ok: false, message: "Failed to register user." };
  }
}

export function setAuthSession(user) {
  if (typeof window === "undefined") return;

  const safeSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || "",
    tagline: user.tagline || "",
    bio: user.bio || "",
    hourlyRate: user.hourlyRate || "",
    gender: user.gender || "",
    country: user.country || "",
    city: user.city || "",
    language: user.language || "",
    languageLevel: user.languageLevel || "",
    skills: Array.isArray(user.skills) ? user.skills : [],
    education: Array.isArray(user.education) ? user.education : [],
    workExperience: Array.isArray(user.workExperience) ? user.workExperience : [],
    awards: Array.isArray(user.awards) ? user.awards : [],
    profileImage: user.profileImage ?? "",
    loggedInAt: new Date().toISOString(),
  };

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(safeSession));
  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function getAuthSession() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function updateAuthSession(updates = {}) {
  if (typeof window === "undefined") return;

  const current = getAuthSession();
  if (!current) return;

  const next = {
    ...current,
    ...updates,
  };

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export async function saveMockUserProfile(updates = {}) {
  const current = getAuthSession();
  if (!current?.id) {
    return { ok: false, message: "No active user session." };
  }

  try {
    const response = await fetch("/api/mock-users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: current.id,
        email: current.email,
        updates,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data?.ok || !data?.user) {
      return {
        ok: false,
        message: data?.message || "Failed to update user profile.",
      };
    }

    const registeredUsers = getRegisteredUsers();
    const existingIndex = registeredUsers.findIndex(
      (user) => user.id === data.user.id || user.email === data.user.email
    );
    const nextRegisteredUsers =
      existingIndex === -1
        ? [...registeredUsers, data.user]
        : registeredUsers.map((user, index) =>
            index === existingIndex ? data.user : user
          );
    setRegisteredUsers(nextRegisteredUsers);
    updateAuthSession(updates);

    return { ok: true, user: data.user };
  } catch {
    return { ok: false, message: "Failed to update user profile." };
  }
}

export async function changeMockUserPassword({
  currentPassword,
  newPassword,
}) {
  const current = getAuthSession();
  if (!current?.id || !current?.email) {
    return { ok: false, message: "No active user session." };
  }

  const trimmedCurrentPassword = String(currentPassword || "");
  const trimmedNewPassword = String(newPassword || "");

  if (!trimmedCurrentPassword || !trimmedNewPassword) {
    return { ok: false, message: "Current and new password are required." };
  }

  try {
    const response = await fetch("/api/mock-users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: current.id,
        email: current.email,
        currentPassword: trimmedCurrentPassword,
        updates: {
          password: trimmedNewPassword,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok || !data?.ok || !data?.user) {
      return {
        ok: false,
        message: data?.message || "Failed to change password.",
      };
    }

    const registeredUsers = getRegisteredUsers();
    const existingIndex = registeredUsers.findIndex(
      (user) => user.id === data.user.id || user.email === data.user.email
    );
    const nextRegisteredUsers =
      existingIndex === -1
        ? [...registeredUsers, data.user]
        : registeredUsers.map((user, index) =>
            index === existingIndex ? data.user : user
          );
    setRegisteredUsers(nextRegisteredUsers);

    return { ok: true };
  } catch {
    return { ok: false, message: "Failed to change password." };
  }
}

export function getRoleFlow(role) {
  return roleFlows[role] || null;
}

export function getMockUsers() {
  return getAllUsers();
}

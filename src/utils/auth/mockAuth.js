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
    
    if (uniqueByEmail.has(key)) {
      const existing = uniqueByEmail.get(key);
      uniqueByEmail.set(key, { 
        ...existing, 
        ...user,
        // Special merging for arrays to avoid losing data
        createdTasks: [...new Set([...(existing.createdTasks || []), ...(user.createdTasks || [])].map(t => t.id))].map(id => {
          const t1 = (existing.createdTasks || []).find(t => t.id === id);
          const t2 = (user.createdTasks || []).find(t => t.id === id);
          return { ...(t1 || {}), ...(t2 || {}) };
        }),
        receivedProposals: [...new Set([...(existing.receivedProposals || []), ...(user.receivedProposals || [])].map(p => p.id))].map(id => {
          const p1 = (existing.receivedProposals || []).find(p => p.id === id);
          const p2 = (user.receivedProposals || []).find(p => p.id === id);
          return { ...(p1 || {}), ...(p2 || {}) };
        }),
        submittedProposals: [...new Set([...(existing.submittedProposals || []), ...(user.submittedProposals || [])].map(p => p.id))].map(id => {
          const p1 = (existing.submittedProposals || []).find(p => p.id === id);
          const p2 = (user.submittedProposals || []).find(p => p.id === id);
          return { ...(p1 || {}), ...(p2 || {}) };
        })
      });
    } else {
      uniqueByEmail.set(key, user);
    }
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

export async function getMockTaskById(taskId) {
  const users = getMockUsers();
  for (const user of users) {
    if (user.createdTasks) {
      const task = user.createdTasks.find((t) => String(t.id) === String(taskId));
      if (task) return task;
    }
  }
  return null;
}

export async function createMockTask(task) {
  const current = getAuthSession();
  if (!current?.id) {
    return { ok: false, message: "No active user session." };
  }

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: current.id,
        task: task,
      }),
    });

    const data = await response.json();
    if (data.ok && data.task) {
      // Update local registered users
      const raw = window.localStorage.getItem("vt_registered_mock_users");
      let registeredUsers = [];
      try {
        registeredUsers = JSON.parse(raw) || [];
      } catch (e) {}

      const nextCreatedTasks = [...(current.createdTasks || []), data.task];
      const userIndex = registeredUsers.findIndex(u => u.id === current.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex].createdTasks = nextCreatedTasks;
      } else {
        // For demo users not yet in registeredUsers, add them now
        registeredUsers.push({
          ...current,
          createdTasks: nextCreatedTasks
        });
      }
      window.localStorage.setItem("vt_registered_mock_users", JSON.stringify(registeredUsers));

      // Update current session
      updateAuthSession({ createdTasks: nextCreatedTasks });
    }
    return data;
  } catch (error) {
    return { ok: false, message: "Failed to create task." };
  }
}

export function getClientTasks(clientId) {
  const users = getAllUsers();
  const user = users.find(u => String(u.id) === String(clientId));
  if (!user || !user.createdTasks) return [];
  
  return user.createdTasks.map(task => ({
    ...task,
    client: user.name,
    clientId: user.id,
    clientEmail: user.email,
  }));
}

export function getAllClientTasks() {
  const users = getAllUsers();
  let tasks = [];
  users.forEach(user => {
    if (user.role === "client" && user.createdTasks) {
      const userTasks = user.createdTasks.map(task => ({
        ...task,
        client: user.name,
        clientId: user.id,
        clientEmail: user.email,
        status: "available" // All dynamic tasks should be available to workers
      }));
      tasks = [...tasks, ...userTasks];
    }
  });
  return tasks;
}

export async function submitProposal(payload) {
  if (typeof window === "undefined") return { ok: false };

  try {
    // 1. Save to global proposals list in localStorage (for immediate client-side UI updates)
    const SUBMITTED_PROPOSALS_KEY = "vt_submitted_proposals";
    const previousProposals = JSON.parse(window.localStorage.getItem(SUBMITTED_PROPOSALS_KEY) || "[]");
    const nextProposals = [payload, ...previousProposals];
    window.localStorage.setItem(SUBMITTED_PROPOSALS_KEY, JSON.stringify(nextProposals));

    // 2. Clear old state in registeredUsers (the API will handle the true persistence)
    // We still keep the localStorage associate for offline/immediate use
    let registeredUsers = getRegisteredUsers();
    
    // Update Worker
    const workerIndex = registeredUsers.findIndex(u => String(u.id) === String(payload.workerId));
    if (workerIndex !== -1) {
      if (!registeredUsers[workerIndex].submittedProposals) registeredUsers[workerIndex].submittedProposals = [];
      registeredUsers[workerIndex].submittedProposals.push(payload);
    }

    // Update Client
    const clientIndex = registeredUsers.findIndex(u => String(u.id) === String(payload.clientId));
    if (clientIndex !== -1) {
      if (!registeredUsers[clientIndex].receivedProposals) registeredUsers[clientIndex].receivedProposals = [];
      registeredUsers[clientIndex].receivedProposals.push(payload);
    }

    setRegisteredUsers(registeredUsers);

    // 3. Persistent Save to mockUsers.json via API
    try {
      await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (apiErr) {
      console.warn("API save failed, falling back to localStorage only", apiErr);
    }

    return { ok: true, proposal: payload };
  } catch (error) {
    console.error("Proposal submission error:", error);
    return { ok: false, message: "Failed to save proposal data." };
  }
}

export function getProposalsForClient(clientId) {
  if (typeof window === "undefined") return [];
  
  // 1. Get global proposals from localStorage
  const raw = window.localStorage.getItem("vt_submitted_proposals");
  let globalProposals = [];
  try {
    globalProposals = JSON.parse(raw) || [];
  } catch {}

  // 2. Get proposals associated with users (from mockUsers.json or registeredUsers)
  const allUsers = getAllUsers();
  const userProposals = [];
  allUsers.forEach(u => {
    if (u.receivedProposals) userProposals.push(...u.receivedProposals);
    if (u.submittedProposals) userProposals.push(...u.submittedProposals);
  });

  // Merge and deduplicate by ID
  const all = [...globalProposals, ...userProposals];
  const unique = Array.from(new Map(all.map(p => [p.id, p])).values());

  return unique.filter(p => String(p.clientId) === String(clientId));
}

export function getProposalCountForTask(taskId) {
  if (typeof window === "undefined") return 0;
  
  // Reuse the logic from getProposalsForClient or similar pooling
  const raw = window.localStorage.getItem("vt_submitted_proposals");
  let globalProposals = [];
  try {
    globalProposals = JSON.parse(raw) || [];
  } catch {}

  const allUsers = getAllUsers();
  const userProposals = [];
  allUsers.forEach(u => {
    if (u.receivedProposals) userProposals.push(...u.receivedProposals);
    if (u.submittedProposals) userProposals.push(...u.submittedProposals);
  });

  const all = [...globalProposals, ...userProposals];
  const unique = Array.from(new Map(all.map(p => [p.id, p])).values());

  return unique.filter(p => String(p.taskId) === String(taskId)).length;
}

export function getWorkerAppliedTasks(workerId) {
  if (typeof window === "undefined") return [];
  
  const allUsers = getAllUsers();
  const worker = allUsers.find(u => String(u.id) === String(workerId));
  if (!worker || !worker.submittedProposals) return [];

  // Map proposals back to a task-like structure for the dashboard
  return worker.submittedProposals.map(p => {
    // Try to find the actual client name
    const client = allUsers.find(u => String(u.id) === String(p.clientId) || u.email === p.clientEmail);
    
    return {
      id: p.taskId,
      title: p.taskTitle,
      client: client?.name || p.clientEmail || "Client",
      budget: `$${p.offerAmount}`,
      deadline: p.timeline ? (isNaN(p.timeline) ? p.timeline : `${p.timeline} Days`) : "N/A",
      skills: ["Applied"],
      status: "applied",
      submittedAt: p.submittedAt,
      proposalId: p.id
    };
  });
}

export function getRoleFlow(role) {
  return roleFlows[role] || null;
}

export function getMockUsers() {
  return getAllUsers();
}

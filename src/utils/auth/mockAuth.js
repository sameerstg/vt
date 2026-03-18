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

const DEMO_PROPOSAL_WORKERS = [
  { id: "worker-demo-uk-1", name: "James Walker", email: "james.walker@demo.com", amount: 920, timeline: "5" },
  { id: "worker-demo-us-1", name: "Olivia Carter", email: "olivia.carter@demo.com", amount: 1040, timeline: "7" },
  { id: "worker-demo-uk-2", name: "William Scott", email: "william.scott@demo.com", amount: 980, timeline: "6" },
];

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

export function getAllUsers() {
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

function getDesiredProposalCountForTask(task = {}, index = 0) {
  if (typeof task.proposals === "number" && task.proposals > 0) {
    return task.proposals;
  }

  if (task.status === "available" || task.status === "Ongoing") {
    return index % 2 === 0 ? 2 : 3;
  }

  return 0;
}

function buildDemoProposalsForClient(clientId) {
  const clientTasks = getClientTasks(clientId);
  const allUsers = getAllUsers();
  const pooledProposals = [];

  allUsers.forEach((user) => {
    if (Array.isArray(user.receivedProposals)) pooledProposals.push(...user.receivedProposals);
    if (Array.isArray(user.submittedProposals)) pooledProposals.push(...user.submittedProposals);
  });

  let globalProposals = [];
  if (typeof window !== "undefined") {
    try {
      globalProposals = JSON.parse(window.localStorage.getItem("vt_submitted_proposals") || "[]");
    } catch {}
  }

  const existingByTaskId = new Map();
  [...pooledProposals, ...globalProposals]
    .filter((proposal) => String(proposal.clientId) === String(clientId))
    .forEach((proposal) => {
      const taskKey = String(proposal.taskId);
      if (!existingByTaskId.has(taskKey)) {
        existingByTaskId.set(taskKey, []);
      }
      existingByTaskId.get(taskKey).push(proposal);
    });

  const fallbackProposals = [];

  clientTasks.forEach((task, index) => {
    const taskKey = String(task.id);
    const existing = existingByTaskId.get(taskKey) || [];
    const desiredCount = getDesiredProposalCountForTask(task, index);

    if (desiredCount <= existing.length) return;

    for (let i = existing.length; i < desiredCount; i += 1) {
      const worker = DEMO_PROPOSAL_WORKERS[i % DEMO_PROPOSAL_WORKERS.length];
      fallbackProposals.push({
        id: `demo-proposal-${task.id}-${i + 1}`,
        taskId: task.id,
        taskTitle: task.title,
        clientId: task.clientId,
        clientEmail: task.clientEmail,
        workerId: worker.id,
        workerName: worker.name,
        workerEmail: worker.email,
        offerType: i % 2 === 0 ? "accept" : "custom",
        offerAmount: worker.amount + index * 25,
        timeline: worker.timeline,
        coverLetter: `I can handle ${task.title} with structured delivery, regular updates, and production-ready output.`,
        submittedAt: new Date(Date.now() - (i + 1) * 3600000).toISOString(),
        status: "pending",
      });
    }
  });

  return fallbackProposals;
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

export function updateMockTaskStatus(taskId, newStatus) {
  if (typeof window === "undefined") return { ok: false };

  const allUsers = getAllUsers().filter((user) => Array.isArray(user.createdTasks));
  const registeredUsers = allUsers;
  let taskFound = false;

  const nextRegisteredUsers = registeredUsers.map((user) => {
    if (user.createdTasks) {
      const nextTasks = user.createdTasks.map((task) => {
        if (String(task.id) === String(taskId)) {
          taskFound = true;
          return { ...task, status: newStatus };
        }
        return task;
      });
      return { ...user, createdTasks: nextTasks };
    }
    return user;
  });

  const current = getAuthSession();
  if (current && current.createdTasks) {
    const nextSessionTasks = current.createdTasks.map((task) => {
      if (String(task.id) === String(taskId)) {
        taskFound = true;
        return { ...task, status: newStatus };
      }
      return task;
    });
    updateAuthSession({ createdTasks: nextSessionTasks });
  }

  if (taskFound) {
    window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(nextRegisteredUsers));
    return { ok: true };
  }

  return { ok: false, message: "Task not found." };
}

export function getTaskById(taskId) {
  if (typeof window === "undefined") return null;
  const allUsers = getAllUsers();

  for (const user of allUsers) {
    if (user.createdTasks) {
      const task = user.createdTasks.find(t => String(t.id) === String(taskId));
      if (task) {
        return {
          ...task,
          clientName: task.client || user.name || user.email.split('@')[0],
          clientEmail: user.email,
          clientLocation: user.location || user.country || "Remote",
          clientImage: user.profileImage || getGeneratedAvatarUrl(user.name)
        };
      }
    }
  }
  return null;
}

export function updateMockTask(taskId, updatedData) {
  if (typeof window === "undefined") return { ok: false };

  const allUsers = getAllUsers().filter((user) => Array.isArray(user.createdTasks));
  const registeredUsers = allUsers;
  let taskFound = false;
  const current = getAuthSession();

  const nextRegisteredUsers = registeredUsers.map((user) => {
    if (user.createdTasks) {
      const nextTasks = user.createdTasks.map((task) => {
        if (String(task.id) === String(taskId)) {
          taskFound = true;
          return { ...task, ...updatedData };
        }
        return task;
      });
      return { ...user, createdTasks: nextTasks };
    }
    return user;
  });

  if (current && current.createdTasks) {
    const nextSessionTasks = current.createdTasks.map(task => {
      if (String(task.id) === String(taskId)) {
        taskFound = true;
        return { ...task, ...updatedData };
      }
      return task;
    });
    updateAuthSession({ createdTasks: nextSessionTasks });
  }

  if (taskFound) {
    window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(nextRegisteredUsers));
    return { ok: true };
  }

  return { ok: false, message: "Task not found." };
}

export function acceptMockProposal(proposal) {
  if (typeof window === "undefined") {
    return { ok: false, message: "Window is not available." };
  }

  if (!proposal?.id || !proposal?.taskId || !proposal?.clientId || !proposal?.workerId) {
    return { ok: false, message: "Incomplete proposal data." };
  }

  const taskUpdateResult = updateMockTask(proposal.taskId, {
    status: "In Progress",
    freelancer: proposal.workerName,
    timeline: proposal.timeline,
    assignedWorkerId: proposal.workerId,
    assignedWorkerEmail: proposal.workerEmail,
    acceptedProposalId: proposal.id,
  });

  if (!taskUpdateResult?.ok) {
    return taskUpdateResult;
  }

  const updateProposalRecord = (item) => {
    if (String(item?.taskId) !== String(proposal.taskId)) return item;

    const nextStatus = String(item.id) === String(proposal.id) ? "accepted" : "rejected";
    return { ...item, status: nextStatus };
  };

  const globalRaw = window.localStorage.getItem("vt_submitted_proposals");
  let globalProposals = [];
  try {
    globalProposals = JSON.parse(globalRaw) || [];
  } catch {}

  window.localStorage.setItem(
    "vt_submitted_proposals",
    JSON.stringify(globalProposals.map(updateProposalRecord))
  );

  const registeredUsers = getRegisteredUsers();
  const nextUsers = registeredUsers.map((user) => ({
    ...user,
    receivedProposals: Array.isArray(user.receivedProposals)
      ? user.receivedProposals.map(updateProposalRecord)
      : user.receivedProposals,
    submittedProposals: Array.isArray(user.submittedProposals)
      ? user.submittedProposals.map(updateProposalRecord)
      : user.submittedProposals,
  }));

  setRegisteredUsers(nextUsers);

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
  window.dispatchEvent(new Event("storage"));

  return { ok: true };
}

export async function deleteMockTask(taskId) {
  if (typeof window === "undefined") return { ok: false };

  let taskDeleted = false;
  
  // 1. Delete from Current Session
  const currentSession = getAuthSession();
  let nextSessionTasks = [];
  if (currentSession && currentSession.createdTasks) {
    const originalLength = currentSession.createdTasks.length;
    nextSessionTasks = currentSession.createdTasks.filter(task => String(task.id) !== String(taskId));
    if (nextSessionTasks.length < originalLength) {
      updateAuthSession({ createdTasks: nextSessionTasks });
      taskDeleted = true;
    }
  }

  // 2. Delete from server-side mockUsers.json via API
  if (currentSession && currentSession.id) {
    try {
      await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: currentSession.id,
          taskId: taskId,
        }),
      });
    } catch (err) {
      console.error("Failed to delete from JSON api", err);
    }
  }

  // 3. Delete from Local Storage (Persistent Storage)
  const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);
  let registeredUsers = [];
  try {
    registeredUsers = JSON.parse(raw) || [];
  } catch (e) {}

  let userIndex = registeredUsers.findIndex(u => currentSession && String(u.id) === String(currentSession.id));
  if (userIndex === -1 && currentSession) {
    const allUsers = getAllUsers();
    const activeUser = allUsers.find(u => String(u.id) === String(currentSession.id));
    if (activeUser) {
      registeredUsers.push(activeUser);
      userIndex = registeredUsers.length - 1;
    }
  }

  if (userIndex !== -1 && registeredUsers[userIndex].createdTasks) {
    const activeUserDb = registeredUsers[userIndex];
    const originalDbLength = activeUserDb.createdTasks.length;
    activeUserDb.createdTasks = activeUserDb.createdTasks.filter(task => String(task.id) !== String(taskId));
    
    if (activeUserDb.createdTasks.length < originalDbLength) {
      taskDeleted = true;
    } else if (taskDeleted && nextSessionTasks) {
      activeUserDb.createdTasks = nextSessionTasks;
    }
  }

  window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));

  if (taskDeleted) {
    return { ok: true, message: "Project deleted successfully!" };
  } else {
    return { ok: false, message: "Task not found to delete." }; 
  }
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

export const saveProposal = submitProposal;

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
  const fallbackProposals = buildDemoProposalsForClient(clientId);
  const all = [...globalProposals, ...userProposals, ...fallbackProposals];
  const unique = Array.from(new Map(all.map(p => [p.id, p])).values());

  return unique.filter(p => String(p.clientId) === String(clientId));
}

export function getProposalCountForTask(taskId) {
  if (typeof window === "undefined") return 0;

  const session = getAuthSession();
  if (!session?.id) return 0;

  return getProposalsForClient(session.id).filter((p) => String(p.taskId) === String(taskId)).length;
}

export function getWorkerAppliedTasks(workerId) {
  if (typeof window === "undefined") return [];
  
  const allUsers = getAllUsers();
  const worker = allUsers.find(u => String(u.id) === String(workerId));
  const email = worker?.email || "";

  // 1. Get global proposals from localStorage
  const raw = window.localStorage.getItem("vt_submitted_proposals");
  let globalProposals = [];
  try {
    globalProposals = JSON.parse(raw) || [];
  } catch {}

  // 2. Get proposals associated with user record
  const userProposals = worker?.submittedProposals || [];

  // Filter global proposals for this worker
  const workerGlobalProposals = globalProposals.filter(p => 
    String(p.workerId) === String(workerId) || (email && p.workerEmail === email)
  );

  // Merge and deduplicate by proposal ID
  const all = [...workerGlobalProposals, ...userProposals];
  const uniqueProposals = Array.from(new Map(all.map(p => [p.id, p])).values());

  if (uniqueProposals.length === 0) return [];

  // Map proposals back to a task-like structure for the dashboard
  return uniqueProposals
    .filter((p) => p.status !== "accepted")
    .map(p => {
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

export function getAllPublishedTasks() {
  if (typeof window === "undefined") return [];
  const allUsers = getAllUsers();
  const allTasks = [];
  allUsers.forEach(user => {
    if (user.createdTasks) {
      user.createdTasks.forEach(task => {
        if (task.status === "Ongoing") {
          allTasks.push({
            ...task,
            clientName: task.client || user.name || user.email.split('@')[0],
            clientLocation: user.location || user.country || "Remote",
            clientEmail: user.email,
            clientImage: user.profileImage || getGeneratedAvatarUrl(user.name)
          });
        }
      });
    }
  });
  return allTasks;
}

// ============================================================
// CONTRACTOR TEAM STORAGE  (vt_contractor_teams)
// ============================================================

const CONTRACTOR_TEAMS_KEY = "vt_contractor_teams";
const CONTRACTOR_PROPOSALS_KEY = "vt_contractor_proposals";
const PAYMENT_DISTRIBUTIONS_KEY = "vt_payment_distributions";

function getContractorTeamsStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(CONTRACTOR_TEAMS_KEY) || "{}");
  } catch { return {}; }
}

function setContractorTeamsStore(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONTRACTOR_TEAMS_KEY, JSON.stringify(data));
}

export function getContractorTeam(contractorId) {
  const store = getContractorTeamsStore();
  return store[contractorId] || { workers: [], assignments: [] };
}

export function addWorkerToTeam(contractorId, worker) {
  const store = getContractorTeamsStore();
  const team = store[contractorId] || { workers: [], assignments: [] };
  if (team.workers.some(w => w.workerId === worker.workerId)) {
    return { ok: false, message: "Worker already in team." };
  }
  team.workers.push(worker);
  store[contractorId] = team;
  setContractorTeamsStore(store);
  return { ok: true, team };
}

export function removeWorkerFromTeam(contractorId, workerId) {
  const store = getContractorTeamsStore();
  const team = store[contractorId] || { workers: [], assignments: [] };
  team.workers = team.workers.filter(w => w.workerId !== workerId);
  store[contractorId] = team;
  setContractorTeamsStore(store);
  return { ok: true };
}

export function assignProjectToWorker(contractorId, taskId, taskTitle, workerId, workerName) {
  const store = getContractorTeamsStore();
  const team = store[contractorId] || { workers: [], assignments: [] };
  if (team.assignments.find(a => a.taskId === taskId && a.workerId === workerId)) {
    return { ok: false, message: "Already assigned." };
  }
  team.assignments.push({
    taskId,
    taskTitle,
    contractorId,
    workerId,
    workerName,
    assignedAt: new Date().toISOString(),
    milestones: [],
  });
  store[contractorId] = team;
  setContractorTeamsStore(store);
  return { ok: true };
}

export function assignMilestonesToWorker(contractorId, taskId, workerId, milestones) {
  const store = getContractorTeamsStore();
  const team = store[contractorId] || { workers: [], assignments: [] };
  const idx = team.assignments.findIndex(a => a.taskId === taskId && a.workerId === workerId);
  if (idx === -1) return { ok: false, message: "Assignment not found." };
  team.assignments[idx].milestones = milestones.map(m => ({
    id: m.id || `m-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    title: m.title,
    price: m.price || 0,
    deadline: m.deadline || "",
    status: m.status || "working",
    progress: m.progress || 0,
    workerNote: "",
    contractorNote: "",
  }));
  store[contractorId] = team;
  setContractorTeamsStore(store);
  return { ok: true };
}

export function getAssignmentsForContractor(contractorId) {
  return getContractorTeam(contractorId).assignments || [];
}

export function updateMilestoneStatus(contractorId, taskId, workerId, milestoneId, updates) {
  const store = getContractorTeamsStore();
  const team = store[contractorId] || { workers: [], assignments: [] };
  const aIdx = team.assignments.findIndex(a => a.taskId === taskId && a.workerId === workerId);
  if (aIdx === -1) return { ok: false, message: "Assignment not found." };
  const mIdx = team.assignments[aIdx].milestones.findIndex(m => m.id === milestoneId);
  if (mIdx === -1) return { ok: false, message: "Milestone not found." };
  team.assignments[aIdx].milestones[mIdx] = { ...team.assignments[aIdx].milestones[mIdx], ...updates };
  store[contractorId] = team;
  setContractorTeamsStore(store);
  return { ok: true };
}

export function updateMilestoneProgress(contractorId, taskId, workerId, milestoneId, progress) {
  return updateMilestoneStatus(contractorId, taskId, workerId, milestoneId, { progress });
}

export function getContractorAssignmentForWorker(workerId, taskId) {
  if (typeof window === "undefined") return null;
  const store = getContractorTeamsStore();
  for (const contractorId of Object.keys(store)) {
    const team = store[contractorId];
    const assignment = (team.assignments || []).find(
      a => a.workerId === workerId && a.taskId === taskId
    );
    if (assignment) return { ...assignment, contractorId };
  }
  return null;
}

export function getWorkerAssignedTasks(workerId) {
  if (typeof window === "undefined") return [];
  const results = [];

  // 1. Client-direct: accepted proposals
  let globalProposals = [];
  try {
    globalProposals = JSON.parse(window.localStorage.getItem("vt_submitted_proposals") || "[]");
  } catch {}

  globalProposals
    .filter(p => String(p.workerId) === String(workerId) && p.status === "accepted")
    .forEach(p => {
      const task = getTaskById(p.taskId);
      if (!task) return;
      results.push({
        id: task.id,
        title: task.title,
        client: task.clientName || task.client || "Client",
        contractorName: null,
        source: "client",
        status: task.status || "In Progress",
        milestones: task.milestones || [],
        budget: task.budget || `$${p.offerAmount}`,
        deadline: task.deadline || p.timeline,
      });
    });

  // 2. Contractor-assigned tasks
  const store = getContractorTeamsStore();
  const allUsers = getAllUsers();
  for (const contractorId of Object.keys(store)) {
    const team = store[contractorId];
    const contractorUser = allUsers.find(u => String(u.id) === String(contractorId));
    const contractorName = contractorUser?.name || a?.contractorName || "Contractor";
    (team.assignments || [])
      .filter(a => String(a.workerId) === String(workerId))
      .forEach(a => {
        const totalBudget = (a.milestones || []).reduce((sum, m) => sum + (m.price || 0), 0);
        const lastDeadline = (a.milestones || []).slice(-1)[0]?.deadline || "—";
        results.push({
          id: a.taskId,
          title: a.taskTitle,
          client: "",
          contractorName: a.contractorName || contractorName,
          contractorId,
          source: "contractor",
          status: "In Progress",
          milestones: a.milestones || [],
          budget: totalBudget ? `$${totalBudget}` : "—",
          deadline: lastDeadline,
          assignmentData: a,
        });
      });
  }

  return results;
}

export function submitWorkerWork(workerId, taskId, milestoneIds, { note = "" } = {}) {
  if (typeof window === "undefined") return { ok: false };
  const store = getContractorTeamsStore();
  let handled = false;

  for (const contractorId of Object.keys(store)) {
    const team = store[contractorId];
    const aIdx = (team.assignments || []).findIndex(
      a => String(a.workerId) === String(workerId) && a.taskId === taskId
    );
    if (aIdx !== -1) {
      team.assignments[aIdx].milestones = team.assignments[aIdx].milestones.map(m => {
        if (milestoneIds.includes(m.id)) {
          return { ...m, status: "submitted", workerNote: note };
        }
        return m;
      });
      store[contractorId] = team;
      handled = true;
    }
  }

  if (handled) {
    setContractorTeamsStore(store);
    return { ok: true };
  }

  return updateMockTaskStatus(taskId, "Work Submitted");
}

// ============================================================
// WORKER CLIENT-DIRECT MILESTONE PROGRESS (vt_worker_client_milestones)
// ============================================================

const WORKER_CLIENT_MILESTONES_KEY = "vt_worker_client_milestones";

function getWorkerClientMilestonesStore() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(WORKER_CLIENT_MILESTONES_KEY) || "{}"); } catch { return {}; }
}

function setWorkerClientMilestonesStore(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WORKER_CLIENT_MILESTONES_KEY, JSON.stringify(data));
}

// Returns merged milestone array for a client-direct task, overlaying stored progress
export function getWorkerClientMilestones(workerId, taskId, baseMilestones = []) {
  const store = getWorkerClientMilestonesStore();
  const key = `${workerId}__${taskId}`;
  const saved = store[key] || {};
  return baseMilestones.map(m => ({
    ...m,
    ...(saved[String(m.id)] || {}),
  }));
}

// Patch a single milestone field (progress, status, note)
export function updateWorkerClientMilestone(workerId, taskId, milestoneId, updates) {
  if (typeof window === "undefined") return { ok: false };
  const store = getWorkerClientMilestonesStore();
  const key = `${workerId}__${taskId}`;
  if (!store[key]) store[key] = {};
  store[key][String(milestoneId)] = { ...(store[key][String(milestoneId)] || {}), ...updates };
  setWorkerClientMilestonesStore(store);
  return { ok: true };
}

// ============================================================
// CONTRACTOR PROPOSALS (vt_contractor_proposals)
// ============================================================

function getContractorProposalsStore() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(CONTRACTOR_PROPOSALS_KEY) || "[]");
  } catch { return []; }
}

function setContractorProposalsStore(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONTRACTOR_PROPOSALS_KEY, JSON.stringify(data));
}

export function submitContractorProposal(payload) {
  const proposals = getContractorProposalsStore();
  const existing = proposals.find(
    p => p.taskId === payload.taskId && p.contractorId === payload.contractorId
  );
  if (existing) return { ok: false, message: "You have already applied for this project." };

  const newProposal = {
    id: `cp-${Date.now()}`,
    ...payload,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  setContractorProposalsStore([newProposal, ...proposals]);
  return { ok: true, proposal: newProposal };
}

export function getContractorProposals(contractorId) {
  return getContractorProposalsStore().filter(p => p.contractorId === contractorId);
}

export function acceptContractorProposal(proposalId) {
  const proposals = getContractorProposalsStore();
  const proposal = proposals.find(p => p.id === proposalId);
  if (!proposal) return { ok: false, message: "Proposal not found." };

  updateMockTask(proposal.taskId, {
    status: "In Progress",
    assignedContractorId: proposal.contractorId,
    assignedContractorName: proposal.contractorName,
    contractorProposalId: proposal.id,
    contractorBid: proposal.totalBid,
  });

  const updated = proposals.map(p => {
    if (p.taskId !== proposal.taskId) return p;
    return { ...p, status: p.id === proposalId ? "accepted" : "rejected" };
  });
  setContractorProposalsStore(updated);
  return { ok: true };
}

// ============================================================
// PAYMENT DISTRIBUTION (vt_payment_distributions)
// ============================================================

export function distributePayment(contractorId, taskId, distributions) {
  if (typeof window === "undefined") return { ok: false };
  let existing = [];
  try {
    existing = JSON.parse(window.localStorage.getItem(PAYMENT_DISTRIBUTIONS_KEY) || "[]");
  } catch {}
  existing.push({
    id: `pd-${Date.now()}`,
    contractorId,
    taskId,
    distributions,
    distributedAt: new Date().toISOString(),
  });
  window.localStorage.setItem(PAYMENT_DISTRIBUTIONS_KEY, JSON.stringify(existing));
  return { ok: true };
}

export function getPaymentDistributions(workerId) {
  if (typeof window === "undefined") return [];
  try {
    const all = JSON.parse(window.localStorage.getItem(PAYMENT_DISTRIBUTIONS_KEY) || "[]");
    const results = [];
    all.forEach(record => {
      (record.distributions || [])
        .filter(d => String(d.workerId) === String(workerId))
        .forEach(d => {
          results.push({
            ...d,
            contractorId: record.contractorId,
            taskId: record.taskId,
            distributedAt: record.distributedAt,
          });
        });
    });
    return results;
  } catch { return []; }
}

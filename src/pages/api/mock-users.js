import fs from "fs/promises";
import path from "path";

const ALLOWED_ROLES = new Set(["client", "worker", "contractor", "admin"]);
function getMockUsersPath() {
  return path.join(process.cwd(), "src", "data", "auth", "mockUsers.json");
}

async function readUsers() {
  const raw = await fs.readFile(getMockUsersPath(), "utf8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeUsers(users) {
  await fs.writeFile(getMockUsersPath(), `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

export default async function handler(req, res) {
  if (!["POST", "PATCH"].includes(req.method)) {
    res.setHeader("Allow", "POST, PATCH");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  if (req.method === "PATCH") {
    try {
      const id = String(req.body?.id || "").trim();
      const email = String(req.body?.email || "")
        .trim()
        .toLowerCase();
      const updates = req.body?.updates && typeof req.body.updates === "object" ? req.body.updates : null;
      const currentPassword = String(req.body?.currentPassword || "");

      if ((!id && !email) || !updates) {
        return res.status(400).json({
          ok: false,
          message: "Invalid update payload.",
        });
      }

      const users = await readUsers();
      const userIndex = users.findIndex(
        (user) =>
          (id && String(user.id || "").trim() === id) ||
          (email && String(user.email || "").toLowerCase() === email)
      );

      if (userIndex === -1) {
        return res.status(404).json({
          ok: false,
          message: "User not found.",
        });
      }

      if (typeof updates.password === "string") {
        if (!currentPassword) {
          return res.status(400).json({
            ok: false,
            message: "Current password is required.",
          });
        }

        if (String(users[userIndex]?.password || "") !== currentPassword) {
          return res.status(403).json({
            ok: false,
            message: "Current password is incorrect.",
          });
        }
      }

      const nextUser = {
        ...users[userIndex],
        ...updates,
      };

      users[userIndex] = nextUser;
      await writeUsers(users);

      return res.status(200).json({ ok: true, user: nextUser });
    } catch {
      return res.status(500).json({
        ok: false,
        message: "Failed to update user in mockUsers.json.",
      });
    }
  }

  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || "");
    const role = String(req.body?.role || "").trim().toLowerCase();
    const phone = String(req.body?.phone || "").trim();

    if (!name || !email || !password || !ALLOWED_ROLES.has(role)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid registration payload.",
      });
    }

    const users = await readUsers();
    const exists = users.some(
      (user) => String(user.email || "").toLowerCase() === email
    );
    if (exists) {
      return res.status(409).json({
        ok: false,
        message: "Email already exists.",
      });
    }

    const user = {
      id: `${role}-user-${Date.now()}`,
      name,
      email,
      password,
      role,
      phone,
      profileImage: "",
    };

    users.push(user);
    await writeUsers(users);

    return res.status(200).json({ ok: true, user });
  } catch {
    return res.status(500).json({
      ok: false,
      message: "Failed to save user in mockUsers.json.",
    });
  }
}

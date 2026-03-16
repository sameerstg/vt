import fs from "fs/promises";
import path from "path";

function getMockUsersPath() {
  return path.join(process.cwd(), "src", "data", "auth", "mockUsers.json");
}

async function readUsers() {
  try {
    const raw = await fs.readFile(getMockUsersPath(), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(getMockUsersPath(), `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  try {
    const { clientId, task } = req.body;

    if (!clientId || !task) {
      return res.status(400).json({
        ok: false,
        message: "Client ID and Task data are required.",
      });
    }

    const users = await readUsers();
    const userIndex = users.findIndex((u) => u.id === clientId);

    if (userIndex === -1) {
      return res.status(404).json({
        ok: false,
        message: "Client not found.",
      });
    }

    const newTask = {
      ...task,
      id: task.id || `task-${Date.now()}`,
      client: users[userIndex].name,
      clientId: clientId,
      createdAt: new Date().toISOString(),
      status: task.status || "available",
    };

    if (!users[userIndex].createdTasks) {
      users[userIndex].createdTasks = [];
    }

    users[userIndex].createdTasks.push(newTask);

    await writeUsers(users);

    return res.status(200).json({ ok: true, task: newTask });
  } catch (error) {
    console.error("Task creation error:", error);
    return res.status(500).json({
      ok: false,
      message: "Failed to save task in mockUsers.json.",
    });
  }
}

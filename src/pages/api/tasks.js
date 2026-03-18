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
  if (req.method === "POST") {
    try {
      const { clientId, task } = req.body;

      if (!clientId || !task) {
        return res.status(400).json({
          ok: false,
          message: "Client ID and Task data are required.",
        });
      }

      const users = await readUsers();
      const userIndex = users.findIndex((u) => String(u.id) === String(clientId));

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
        status: task.status || "Draft",
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
  } else if (req.method === "DELETE") {
    try {
      const { clientId, taskId } = req.body;

      if (!clientId || !taskId) {
        return res.status(400).json({ ok: false, message: "Client ID and Task ID are required." });
      }

      const users = await readUsers();
      const userIndex = users.findIndex((u) => String(u.id) === String(clientId));

      if (userIndex === -1) {
        return res.status(404).json({ ok: false, message: "Client not found." });
      }

      if (users[userIndex].createdTasks) {
        const originalLength = users[userIndex].createdTasks.length;
        users[userIndex].createdTasks = users[userIndex].createdTasks.filter(
          (t) => String(t.id) !== String(taskId)
        );

        if (users[userIndex].createdTasks.length < originalLength) {
          await writeUsers(users);
          return res.status(200).json({ ok: true, message: "Task permanently deleted from JSON." });
        }
      }

      return res.status(404).json({ ok: false, message: "Task not found." });
    } catch (error) {
      console.error("Task deletion error:", error);
      return res.status(500).json({ ok: false, message: "Failed to delete task from mockUsers.json." });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }
}

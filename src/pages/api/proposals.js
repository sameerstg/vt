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
    const payload = req.body;

    if (!payload.taskId || !payload.clientId || !payload.workerId) {
      return res.status(400).json({
        ok: false,
        message: "Incomplete proposal data.",
      });
    }

    const users = await readUsers();
    
    // Update Worker's record
    const workerIndex = users.findIndex((u) => u.id === payload.workerId);
    if (workerIndex !== -1) {
      if (!users[workerIndex].submittedProposals) users[workerIndex].submittedProposals = [];
      users[workerIndex].submittedProposals.push(payload);
    }

    // Update Client's record
    const clientIndex = users.findIndex((u) => u.id === payload.clientId);
    if (clientIndex !== -1) {
      if (!users[clientIndex].receivedProposals) users[clientIndex].receivedProposals = [];
      users[clientIndex].receivedProposals.push(payload);
      
      // Also update the proposal count on the specific task if it exists in createdTasks
      if (users[clientIndex].createdTasks) {
        const taskIndex = users[clientIndex].createdTasks.findIndex(t => t.id === payload.taskId);
        if (taskIndex !== -1) {
          const currentCount = users[clientIndex].createdTasks[taskIndex].proposals || 0;
          users[clientIndex].createdTasks[taskIndex].proposals = currentCount + 1;
        }
      }
    }

    await writeUsers(users);

    return res.status(200).json({ ok: true, proposal: payload });
  } catch (error) {
    console.error("Proposal saving error:", error);
    return res.status(500).json({
      ok: false,
      message: "Failed to save proposal in mockUsers.json.",
    });
  }
}

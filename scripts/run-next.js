const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const nextBin = require.resolve("next/dist/bin/next");
const args = process.argv.slice(2);
const command = args[0];
const nextBuildDir = path.join(process.cwd(), ".next");

if (command === "dev" && fs.existsSync(nextBuildDir)) {
  fs.rmSync(nextBuildDir, { recursive: true, force: true });
}

const env = { ...process.env };
delete env.NODE_OPTIONS;
delete env.npm_config_node_options;
delete env.NODE_LOCALSTORAGE_FILE;

const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: "inherit",
  env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});


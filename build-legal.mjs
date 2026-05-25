// Legal docs build: invokes the python converter that uses mammoth.
// Kept as a thin wrapper so `npm run build:legal` works alongside the existing build.
import { spawn } from "child_process";
const p = spawn("python", ["build-legal.py"], { stdio: "inherit" });
p.on("close", code => process.exit(code));

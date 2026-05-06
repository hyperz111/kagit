import * as fs from "node:fs";
import * as path from "node:path";
import { spawnSync } from "node:child_process";

const destination = fs.mkdtempSync(path.join(import.meta.dirname, "publish-"));
fs.cpSync(path.join(import.meta.dirname, "..", "bin"), path.join(destination, "bin"), { recursive: true });

const packageJson = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "..", "package.json"), "utf8"));

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.packageManager;
delete packageJson.kagit;

fs.writeFileSync(path.join(destination, "package.json"), JSON.stringify(packageJson));

spawnSync("pnpm", ["publish", "--no-git-checks"], { stdio: "inherit", cwd: destination });

fs.rmSync(destination, { recursive: true, force: true });

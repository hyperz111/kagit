import { describe, test, beforeEach, afterEach } from "node:test";
import * as path from "node:path";
import * as fs from "node:fs";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import * as assert from "node:assert/strict";

describe("kagitin", () => {
	const bin = path.resolve(import.meta.dirname, "..", "bin");
	/** @type {string} */
	let cwd;
	/** @type {import("node:child_process").SpawnSyncOptions} */
	const baseSpawnOptions = { encoding: "utf8" };

	beforeEach(() => {
		cwd = fs.mkdtempSync(path.join(tmpdir(), "kagitin-"));
		baseSpawnOptions.cwd = cwd;

		spawnSync("git", ["init"], baseSpawnOptions);
		spawnSync("git", ["config", "user.email", "hyperz111@github.com"], baseSpawnOptions);
		spawnSync("git", ["config", "user.name", "hyperz111"], baseSpawnOptions);
		spawnSync("npm", ["init", "-y"], baseSpawnOptions);

		const packageJson = path.resolve(cwd, "package.json");
		const content = JSON.parse(fs.readFileSync(packageJson, "utf8"));
		content.kagitin = { "pre-commit": "echo hi" };
		fs.writeFileSync(packageJson, JSON.stringify(content));
	});

	afterEach(() => {
		fs.rmSync(cwd, { force: true, recursive: true });
	});

	describe("installation", () => {
		test("success", () => {
			const spawn = spawnSync("node", [bin], baseSpawnOptions);
			assert.strictEqual(spawn.status, 0);

			const hooks = fs.readdirSync(path.resolve(cwd, ".git", "hooks"));
			assert.strictEqual(hooks.length, 1);
			assert.strictEqual(hooks[0], "pre-commit");
		});

		test("fail", () => {
			fs.readdirSync(cwd).forEach((file) => fs.rmSync(path.join(cwd, file), { force: true, recursive: true }));

			const spawn = spawnSync("node", [bin], baseSpawnOptions);
			assert.strictEqual(spawn.status, 1);
			assert.strictEqual(spawn.stderr, ".git not found\n");
		});

		test("skipped", () => {
			const spawn = spawnSync("node", [bin], {
				...baseSpawnOptions,
				env: { ...process.env, KAGITIN: "0" },
			});
			assert.strictEqual(spawn.status, 0);

			const hooks = fs.readdirSync(path.resolve(cwd, ".git", "hooks"));
			assert.ok(hooks.length > 0);
		});
	});

	describe("hook", () => {
		test("success", () => {
			spawnSync("node", [bin], baseSpawnOptions);
			spawnSync("git", ["add", "."], baseSpawnOptions);

			const commit = spawnSync("git", ["commit", "-am", "initial"], baseSpawnOptions);
			assert.strictEqual(commit.status, 0);
			assert.strictEqual(commit.stderr, "hi\n");
		});

		test("skipped", () => {
			spawnSync("node", [bin], baseSpawnOptions);
			spawnSync("git", ["add", "."], baseSpawnOptions);

			const commit = spawnSync("git", ["commit", "-am", "initial", "--no-verify"], baseSpawnOptions);
			assert.strictEqual(commit.status, 0);
			assert.strictEqual(commit.stderr, "");
		});
	});
});

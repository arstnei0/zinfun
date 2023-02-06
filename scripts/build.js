import { spawn } from "child_process"
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from "url"

const _dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: dirname(fileURLToPath(import.meta.url))

const webBuild = spawn("pnpm", ["build"], {
	cwd: path.resolve(_dirname, "../packages/web"),
	env: process.env,
})
webBuild.stdout.pipe(process.stdout)

const scriptBuild = spawn("pnpm", ["build"], {
	cwd: path.resolve(_dirname, "../packages/script"),
	env: process.env,
})
scriptBuild.stdout.pipe(process.stdout)

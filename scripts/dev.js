import { spawn } from "child_process"
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from "url"

const _dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: dirname(fileURLToPath(import.meta.url))

process.env.BUNDLE = false

const webDev = spawn("pnpm", ["dev"], {
	cwd: path.resolve(_dirname, "../packages/web"),
})
webDev.stdout.pipe(process.stdout)

const scriptDev = spawn("pnpm", ["dev"], {
	cwd: path.resolve(_dirname, "../packages/script"),
	env: process.env,
})
scriptDev.stdout.pipe(process.stdout)

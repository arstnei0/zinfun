import { defineConfig } from "astro/config"
import solidJs from "@astrojs/solid-js"
import compress from "astro-compress"
import fs from "fs"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
	integrations: [
		solidJs(),
		compress({
			css: false,
		}),
	],
	output: "server",
	adapter: vercel(),
	vite: {
		server: {
			https: {
				cert: fs.readFileSync("./localhost.crt"),
				key: fs.readFileSync("./localhost.key"),
			},
		},
	},
})

import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import dts from "vite-plugin-dts"
import { resolve } from "path"

export default defineConfig({
	plugins: [solid()],
	build: {
		lib: {
			entry: "./src/entry.tsx",
			formats: ["iife"],
			name: "zinfun",
		},
		outDir: "../web/public/static",
		emptyOutDir: true,
		minify: process.env.BUNDLE === "false" ? false : "terser",
		rollupOptions: {},
		terserOptions: {
			compress: true,
		},
	},
	define: {
		"process.env": "{NODE_ENV:'production'}",
	},
})

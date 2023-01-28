import { z } from "zod"

export const serverScheme = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	DATABASE_URL: z.string(),
	NEXTAUTH_URL: z.string(),
	SECRET: z.string(),
	GITHUB_ID: z.string(),
	GITHUB_SECRET: z.string(),
})

export const clientScheme = z.object({
	MODE: z.enum(["development", "production", "test"]).default("development"),
})

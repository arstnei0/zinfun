import { serverScheme } from "../env/schema"
import type { ZodFormattedError } from "zod"

export const formatErrors = (
	errors: ZodFormattedError<Map<string, string>, string>
) =>
	Object.entries(errors)
		.map(([name, value]) => {
			if (value && "_errors" in value)
				return `${name}: ${value._errors.join(", ")}\n`
		})
		.filter(Boolean)

const env = serverScheme.safeParse(
	Object.fromEntries(
		Object.entries(import.meta.env).map(([k, v]) => [
			k.startsWith("PUBLIC_") ? k.slice(7) : k,
			v,
		])
	)
)

if (env.success === false) {
	console.error(
		"❌ Invalid environment variables:\n",
		...formatErrors(env.error.format())
	)
	throw new Error("Invalid environment variables")
}

export const serverEnv = env.data
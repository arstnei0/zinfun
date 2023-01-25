import { PrismaClient } from "@prisma/client"
import { serverEnv } from "~/env/server"

declare global {
	// eslint-disable-next-line no-var
	var prisma: any | undefined
}

export const prisma: any =
	global.prisma ||
	new PrismaClient({
		log:
			serverEnv.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	})

if (serverEnv.NODE_ENV !== "production") {
	global.prisma = prisma
}

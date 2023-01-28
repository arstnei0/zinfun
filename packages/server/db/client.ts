import { PrismaClient } from "@prisma/client"
import { serverEnv } from "~env/server"

declare global {
	// eslint-disable-next-line no-var
	var prisma: any | undefined
}

export const prisma: PrismaClient =
	globalThis.prisma ||
	new PrismaClient({
		log:
			serverEnv.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	})

if (serverEnv.NODE_ENV !== "production") {
	globalThis.prisma = prisma
}

export const getUserId = async <T extends string | undefined>(email: T) => {
	const res = await prisma.user.findUnique({
		where: {
			email: email,
		},
		select: { id: true },
	})

	return res?.id as T
}

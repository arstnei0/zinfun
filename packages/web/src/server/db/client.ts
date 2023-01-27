import { PrismaClient } from "@prisma/client"
import { serverEnv } from "~/env/server"

declare global {
	// eslint-disable-next-line no-var
	var prisma: any | undefined
}

export const prisma: PrismaClient =
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

export const getUserId = async (email: string) => {
	const res = await prisma.user.findUnique({
		where: {
			email: email,
		},
		select: { id: true },
	})
	console.log(await prisma.user.findMany())

	return res?.id as string
}

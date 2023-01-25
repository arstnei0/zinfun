import { z } from "zod"
import { procedure, router } from "../utils"
import { prisma } from "~/server/db/client"

export default router({
	test: procedure.query(async ({ ctx: { session } }) => {
		console.log(session)
		return prisma.user.findMany()
	}),
})

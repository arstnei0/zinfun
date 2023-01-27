import { z } from "zod"
import { protectedProcedure, router } from "../utils"
import { getUserId, prisma } from "db"

export const siteRouter = router({
	all: protectedProcedure.query(async ({ ctx: { session } }) => {
		return prisma.site.findMany({
			where: {
				userId: await getUserId(session.user.email),
			},
		})
	}),
	new: protectedProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ input, ctx: { session } }) => {
			const userId = await getUserId(session.user.email)
			console.log(userId)
			// return prisma.site.create({
			// 	data: {
			// 		name: input.name,
			// 		userId: userId,
			// 	},
			// })
		}),
})

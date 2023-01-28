import { z } from "zod"
import { protectedProcedure, router } from "../utils"
import { getUserId, prisma } from "db"
import { TRPCError } from "@trpc/server"

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
			return prisma.site.create({
				data: {
					name: input.name,
					userId: await getUserId(session.user.email),
				},
			})
		}),
	get: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx: { session }, input: { id } }) => {
			const site = await prisma.site.findUnique({
				where: {
					id,
				},
			})
			if (site?.userId != (await getUserId(session.user.email))) {
				throw new TRPCError({
					code: "FORBIDDEN",
				})
			}
			return site
		}),
})

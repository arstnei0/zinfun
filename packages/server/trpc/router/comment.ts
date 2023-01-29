import { z } from "zod"
import { procedure, protectedProcedure, router } from "../utils"
import { getUserId, prisma } from "db"
import { ReactionType } from "@prisma/client"
import { TRPCError } from "@trpc/server"

const own = async (userId: string | undefined, id: string) => {
	if (!userId) return false
	const commentInfo = await prisma.comment.findUnique({
		where: { id },
		select: {
			page: {
				select: { site: { select: { userId: true } } },
			},
			userId: true,
		},
	})

	return (
		userId === commentInfo?.userId ||
		userId === commentInfo?.page?.site.userId
	)
}

export const commentRouter = router({
	up: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx: { session }, input: { id } }) => {
			const userId = await getUserId(session.user.email)

			const uped =
				(await prisma.comment.count({
					where: {
						id: id,
						up: { some: { id: userId } },
					},
				})) !== 0

			if (uped) {
				return await prisma.comment.update({
					where: { id },
					data: {
						up: { disconnect: { id: userId } },
					},
				})
			}

			return await prisma.comment.update({
				where: { id },
				data: {
					up: { connect: { id: userId } },
				},
			})
		}),
	own: procedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx: { session }, input: { id } }) => {
			return await own(await getUserId(session?.user.email), id)
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx: { session }, input: { id } }) => {
			const userId = await getUserId(session.user.email)
			if (!(await own(userId, id))) {
				throw new TRPCError({
					code: "FORBIDDEN",
				})
			}

			return [
				await prisma.comment.deleteMany({
					where: { parentId: id },
				}),
				await prisma.comment.delete({
					where: { id },
				}),
			]
		}),
})

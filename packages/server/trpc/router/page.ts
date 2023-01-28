import { z } from "zod"
import { procedure, protectedProcedure, router } from "../utils"
import { getUserId, prisma } from "db"

const viewPageIncludeOptions = {
	comments: true,
	_count: { select: { comments: true } },
}
export const pageRouter = router({
	all: procedure
		.input(z.object({ siteId: z.string() }))
		.query(async ({ input: { siteId } }) => {
			return await prisma.page.findMany({
				where: {
					siteId,
				},
			})
		}),
	view: procedure
		.input(z.object({ id: z.string(), siteId: z.string() }))
		.query(async ({ input: { id, siteId } }) => {
			let page = await prisma.page.findUnique({
				where: { id },
				include: viewPageIncludeOptions,
			})
			if (!page)
				page = await prisma.page.create({
					data: { id, siteId },
					include: viewPageIncludeOptions,
				})

			return page
		}),
	comment: procedure
		.input(z.object({ pageId: z.string(), content: z.string() }))
		.mutation(async ({ ctx: { session }, input }) => {
			const userId = await getUserId(session?.user.email)

			return await prisma.comment.create({
				data: {
					content: input.content,
					pageId: input.pageId,
					userId: userId,
				},
			})
		}),
})

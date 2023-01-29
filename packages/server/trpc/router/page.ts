import { z } from "zod"
import { procedure, protectedProcedure, router } from "../utils"
import { getUserId, prisma } from "db"
import { ReactionType } from "@prisma/client"
import { TRPCError } from "@trpc/server"

const viewPageIncludeOptions = {
	comments: true,
	_count: { select: { comments: true } },
}

const reactionsList = [
	ReactionType.Eyes,
	ReactionType.Happy,
	ReactionType.Love,
	ReactionType.Party,
	ReactionType.Rocket,
	ReactionType.Sad,
	ReactionType.ThumbUp,
	ReactionType.ThumbDown,
] as const

const addUped = async (comment: any, userId: string | undefined) => {
	const uped = userId
		? (await prisma.comment.count({
				where: {
					id: comment.id,
					up: { some: { id: userId } },
				},
		  })) !== 0
		: false

	const children = comment.children
		? await Promise.all(
				comment.children.map(
					async (child: any) => await addUped(child, userId)
				)
		  )
		: []

	return { ...comment, uped, children }
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
			})
			if (!page)
				page = await prisma.page.create({
					data: { id, siteId },
				})
			await prisma.page.update({
				where: { id },
				data: {
					view: page.view + 1,
				},
			})
			page.view += 1

			return page
		}),
	comments: procedure
		.input(
			z.object({
				pageId: z.string(),
				sortBy: z.enum(["date-old", "date-new", "up"]).default("up"),
			})
		)
		.query(async ({ input, ctx: { session } }) => {
			const userId = await getUserId(session?.user.email)
			const commentsWithoutUped = await prisma.comment.findMany({
				where: {
					pageId: input.pageId,
					NOT: {
						parentId: {
							not: null,
						},
					},
				},
				select: {
					content: true,
					id: true,
					date: true,
					user: { select: { name: true, image: true } },
					_count: {
						select: {
							up: true,
						},
					},
					children: {
						select: {
							content: true,
							id: true,
							date: true,
							user: { select: { name: true, image: true } },
							_count: {
								select: { up: true },
							},
						},
					},
				},
				orderBy: [
					input.sortBy === "up"
						? {
								up: { _count: "desc" },
						  }
						: {
								date:
									input.sortBy === "date-new"
										? "desc"
										: "asc",
						  },
				],
			})
			const comments = await Promise.all(
				commentsWithoutUped.map(
					async (comment) => await addUped(comment, userId)
				)
			)

			return { count: comments.length, data: comments }
		}),
	comment: protectedProcedure
		.input(
			z.object({
				pageId: z.string(),
				content: z.string(),
				parent: z.string().optional(),
			})
		)
		.mutation(async ({ ctx: { session }, input }) => {
			const userId = await getUserId(session?.user.email)

			return await prisma.comment.create({
				data: {
					content: input.content,
					pageId: input.pageId,
					userId: userId,
					parentId: input.parent,
				},
			})
		}),
	reactions: procedure
		.input(z.object({ pageId: z.string() }))
		.query(async ({ input: { pageId }, ctx: { session } }) => {
			const userId = await getUserId(session?.user.email)
			const reactionsCount = {} as Record<ReactionType, [number, boolean]>
			await Promise.all(
				reactionsList.map(async (reaction) => {
					const count = await prisma.reaction.count({
						where: {
							pageId,
							type: reaction,
						},
					})
					const reacted = userId
						? (await prisma.reaction.count({
								where: {
									pageId,
									type: reaction,
									userId,
								},
						  })) !== 0
						: false
					reactionsCount[reaction] = [count, reacted]
				})
			)

			return reactionsCount
		}),
	react: protectedProcedure
		.input(z.object({ pageId: z.string(), reactionType: z.string() }))
		.mutation(
			async ({
				input: { pageId, reactionType },
				ctx: {
					session: { user },
				},
			}) => {
				const userId = await getUserId(user.email)
				if (!reactionsList.includes(reactionType as any)) {
					throw new TRPCError({
						code: "BAD_REQUEST",
					})
				}
				const reacted =
					(await prisma.reaction.count({
						where: {
							pageId,
							type: reactionType as ReactionType,
							userId,
						},
					})) !== 0

				if (reacted) {
					return await prisma.reaction.deleteMany({
						where: {
							pageId,
							userId,
							type: reactionType as ReactionType,
						},
					})
				}

				await prisma.reaction.create({
					data: {
						type: reactionType as ReactionType,
						userId,
						pageId,
					},
				})
			}
		),
})

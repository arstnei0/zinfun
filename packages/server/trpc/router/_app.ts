import { router, t } from "../utils"
import { commentRouter } from "./comment"
import { pageRouter } from "./page"
import { siteRouter } from "./site"

export const appRouter = router({
	site: siteRouter,
	page: pageRouter,
	comment: commentRouter,
})

export type IAppRouter = typeof appRouter

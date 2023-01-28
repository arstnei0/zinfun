import { router, t } from "../utils"
import { pageRouter } from "./page"
import { siteRouter } from "./site"

export const appRouter = router({
	site: siteRouter,
	page: pageRouter,
})

export type IAppRouter = typeof appRouter

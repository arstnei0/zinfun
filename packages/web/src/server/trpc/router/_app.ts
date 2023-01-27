import { t } from "../utils"
import { siteRouter } from "./site"

export const appRouter = t.router({
	site: siteRouter,
})

export type IAppRouter = typeof appRouter

import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { prisma } from "db"
import { getSession } from "../auth/session"
import { authConfig } from "../auth/config"
import { Session } from "@auth/core/types"

export const createContextInner = async (opts: FetchCreateContextFnOptions) => {
	const session = (await getSession(opts.req, authConfig)) as
		| (Session & { user: { email: string } })
		| null

	return {
		...opts,
		prisma,
		session,
	}
}

export const createContext = async (opts: FetchCreateContextFnOptions) => {
	return await createContextInner(opts)
}

export type IContext = inferAsyncReturnType<typeof createContext>

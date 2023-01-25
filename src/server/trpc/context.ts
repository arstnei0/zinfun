import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { prisma } from "~/server/db/client"
import { getSession } from "~/server/auth/session"
import { authConfig } from "../auth/config"

export const createContextInner = async (opts: FetchCreateContextFnOptions) => {
	const session = await getSession(opts.req, authConfig)

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

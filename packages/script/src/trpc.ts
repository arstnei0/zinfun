import type { IAppRouter } from "~server/trpc/router/_app"
import { createTRPCSolid } from "solid-trpc"
import { httpBatchLink } from "@trpc/client"
import { QueryClient } from "@tanstack/solid-query"

export const trpc = createTRPCSolid<IAppRouter>()
export const client = trpc.createClient({
	links: [
		httpBatchLink({
			url: "/api/trpc",
		}),
	],
} as any)
export const queryClient = new QueryClient()

export default trpc

import type { IAppRouter } from "~/server/trpc/router/_app" // your router type
import { createTRPCSolid } from "solid-trpc"
import { httpBatchLink } from "@trpc/client"
import { QueryClient } from "@tanstack/solid-query"

export const trpc = createTRPCSolid<IAppRouter & { isDev: boolean }>()
export const client = trpc.createClient({
	links: [
		httpBatchLink({
			url: "/api/trpc",
		}),
	],
})
export const queryClient = new QueryClient()

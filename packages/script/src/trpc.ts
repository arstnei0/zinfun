import type { IAppRouter } from "~server/trpc/router/_app"
import type { IContext } from "~server/trpc/context"
import { createTRPCSolid } from "solid-trpc"
import { httpBatchLink } from "@trpc/client"
import { QueryClient } from "@tanstack/solid-query"

export const trpc = createTRPCSolid<IAppRouter, IContext>()

export function createTRPCClient(apiUrl) {
	const client = trpc.createClient({
		links: [
			httpBatchLink({
				url: "/api/trpc",
			}),
		],
	} as any)
	const queryClient = new QueryClient()

	return { client, queryClient }
}

export default trpc

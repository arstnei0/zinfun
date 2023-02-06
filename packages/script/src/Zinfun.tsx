import { Component } from "solid-js"
import { createTRPCClient, trpc } from "./trpc"
import UI from "./ui"

export const Zinfun: Component<{
	pageId: string
	siteId: string
	apiUrl: string
	showViews?: boolean
	showReactions?: boolean
}> = (props) => {
	const { client, queryClient } = createTRPCClient(props.apiUrl)

	return (
		<trpc.Provider client={client} queryClient={queryClient}>
			<UI
				showViews={
					props.showViews === undefined ? true : props.showViews
				}
				showReactions={
					props.showReactions === undefined
						? true
						: props.showReactions
				}
				pageId={props.pageId}
				siteId={props.siteId}
			/>
		</trpc.Provider>
	)
}

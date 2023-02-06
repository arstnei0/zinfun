import { Component, Show, createEffect, createSignal, For } from "solid-js"
import trpc from "../trpc"
import { Comments } from "./comments"
import { Reactions } from "./reactions"

const UI: Component<{
	pageId: string
	siteId: string
	showViews: boolean
	showReactions: boolean
}> = (props) => {
	const page = trpc.page.view.useQuery(() => ({
		id: props.pageId,
		siteId: props.siteId,
	}))

	return (
		<>
			<div id="zf">
				<Show when={page.data}>
					<Show when={props.showViews}>
						<h2 id="views">{page.data.view} views</h2>
					</Show>

					<Show when={props.showReactions}>
						<Reactions pageId={props.pageId} />
					</Show>

					<Comments pageId={props.pageId} />
				</Show>
			</div>
		</>
	)
}

export default UI

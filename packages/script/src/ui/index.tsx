import { Component, Show, createEffect, createSignal, For } from "solid-js"
import { Config } from "../entry"
import trpc from "../trpc"
import { Button } from "./Button"
import { Comments } from "./comments"
import { Reactions } from "./reactions"
import "./style.css"

const UI: Component<{ config: Config }> = (props) => {
	const page = trpc.page.view.useQuery(() => ({
		id: props.config.pageId,
		siteId: props.config.id,
	}))

	return (
		<>
			<div id="zf-container">
				<Show when={page.data}>
					<h2 id="zf-views">{page.data.view} views</h2>

					<Reactions config={props.config} />

					<Comments config={props.config} />
				</Show>
			</div>
		</>
	)
}

export default UI

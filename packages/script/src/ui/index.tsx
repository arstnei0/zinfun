import { Component, Show, createEffect, createSignal, For } from "solid-js"
import { Config } from "../entry"
import trpc from "../trpc"

const UI: Component<{ config: Config }> = (props) => {
	const page = trpc.page.view.useQuery(() => ({
		id: props.config.pageId,
		siteId: props.config.id,
	}))
	const newComment = trpc.page.comment.useMutation()
	const [newCommentContent, setNewCommentContent] = createSignal("")

	return (
		<>
			<Show when={page.data}>
				<h1>{page.data._count.comments} comments</h1>
				<input
					value={newCommentContent()}
					onInput={(e) =>
						setNewCommentContent((e.target as any).value)
					}
				></input>
				<button
					onClick={async () => {
						await newComment.mutateAsync({
							pageId: props.config.pageId,
							content: newCommentContent(),
						})
						page.refetch()
					}}
				>
					Comment
				</button>
				<For each={page.data.comments}>
					{(comment) => <p>{comment.content}</p>}
				</For>
			</Show>
		</>
	)
}

export default UI

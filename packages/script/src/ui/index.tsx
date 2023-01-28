import { Component, Show, createEffect, createSignal, For } from "solid-js"
import { Config } from "../entry"
import trpc from "../trpc"

const UI: Component<{ config: Config }> = (props) => {
	const page = trpc.page.view.useQuery(() => ({
		id: props.config.pageId,
		siteId: props.config.id,
	}))
	const comments = trpc.page.comments.useQuery(() => ({
		pageId: props.config.pageId,
	}))
	const newComment = trpc.page.comment.useMutation()
	const [newCommentContent, setNewCommentContent] = createSignal("")

	return (
		<>
			<Show when={page.data && comments.data?.count !== undefined}>
				<h2>{page.data.view} views</h2>
				<h1>{comments.data.count} comments</h1>
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
						comments.refetch()
					}}
				>
					Comment
				</button>
				<For each={comments.data.data}>
					{(comment) => <p>{comment.content}</p>}
				</For>
			</Show>
		</>
	)
}

export default UI

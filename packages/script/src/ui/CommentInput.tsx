import { Component, createSignal } from "solid-js"
import trpc from "../trpc"

export const CommentInput: Component<{
	pageId: string
	parent?: string
	onSuccess?: any
}> = (props) => {
	const newComment = trpc.page.comment.useMutation()
	const [newCommentContent, setNewCommentContent] = createSignal("")

	return (
		<>
			<div class="comment-input">
				<input
					value={newCommentContent()}
					onInput={(e) =>
						setNewCommentContent((e.target as any).value)
					}
				></input>
				<button
					onClick={async () => {
						await newComment.mutateAsync({
							pageId: props.pageId,
							content: newCommentContent(),
							parent: props.parent,
						})
						setNewCommentContent("")
						props.onSuccess?.()
					}}
				>
					Comment
				</button>
			</div>
		</>
	)
}

import { Component, createEffect, createSignal, For, Show } from "solid-js"
import trpc from "../trpc"
import { CommentInput } from "./CommentInput"

export const Comment: Component<{
	comment: any
	pageId: string
	child?: boolean
	onChange?: any
}> = (props) => {
	const [replyOpen, setReplyOpen] = createSignal(false)
	const up = trpc.comment.up.useMutation()
	const own = trpc.comment.own.useQuery(() => ({
		id: props.comment.id,
	}))
	const del = trpc.comment.delete.useMutation()

	return (
		<div class="props.comment-container">
			<div class="props.comment-user">
				<img
					class="props.comment-user-image"
					src={props.comment.user.image}
					width="30"
					height="30"
				/>
				<div class="props.comment-user-name">
					{props.comment.user.name}
				</div>
			</div>
			<div class="props.comment-content">{props.comment.content}</div>
			<div class="props.comment-actions">
				<button
					class="comment-up"
					classList={{
						uped: props.comment.uped,
					}}
					onClick={async () => {
						await up.mutateAsync({
							id: props.comment.id,
						})
						props.onChange?.()
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M12 20q-.425 0-.712-.288Q11 19.425 11 19V7.825L6.125 12.7q-.3.3-.713.3Q5 13 4.7 12.7t-.3-.7q0-.4.3-.7l6.6-6.6q.15-.15.325-.213q.175-.062.375-.062t.388.062q.187.063.312.213l6.6 6.6q.3.3.3.7q0 .4-.3.7q-.3.3-.713.3q-.412 0-.712-.3L13 7.825V19q0 .425-.287.712Q12.425 20 12 20Z"
						></path>
					</svg>
					{props.comment._count.up}
				</button>
				<Show when={own.data === true}>
					<button
						class="comment-delete"
						onClick={async () => {
							await del.mutateAsync({ id: props.comment.id })
							props.onChange?.()
						}}
					>
						{/* prettier-ignore */}
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6q-.425 0-.713-.287Q4 5.425 4 5t.287-.713Q4.575 4 5 4h4q0-.425.288-.713Q9.575 3 10 3h4q.425 0 .713.287Q15 3.575 15 4h4q.425 0 .712.287Q20 4.575 20 5t-.288.713Q19.425 6 19 6v13q0 .825-.587 1.413Q17.825 21 17 21ZM7 6v13h10V6Zm2 10q0 .425.288.712Q9.575 17 10 17t.713-.288Q11 16.425 11 16V9q0-.425-.287-.713Q10.425 8 10 8t-.712.287Q9 8.575 9 9Zm4 0q0 .425.288.712q.287.288.712.288t.713-.288Q15 16.425 15 16V9q0-.425-.287-.713Q14.425 8 14 8t-.712.287Q13 8.575 13 9ZM7 6v13V6Z"></path></svg>
					</button>
				</Show>
				<Show when={!props.child}>
					<button onClick={() => setReplyOpen((open) => !open)}>
						Reply
					</button>
				</Show>
			</div>
			<Show when={!props.child && replyOpen()}>
				<CommentInput
					parent={props.comment.id}
					pageId={props.pageId}
					onSuccess={() => {
						props.onChange?.()
					}}
				/>
			</Show>
			<Show when={props.comment.children}>
				<div class="comment-children">
					<For each={props.comment.children}>
						{(child) => (
							<Comment
								comment={child}
								pageId={props.pageId}
								child={true}
								onChange={props.onChange}
							/>
						)}
					</For>
				</div>
			</Show>
		</div>
	)
}

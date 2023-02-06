import { Component, createEffect, createSignal, For, Show } from "solid-js"
import trpc from "../trpc"
import { Config } from "../entry"
import { Button } from "./Button"
import { CommentInput } from "./CommentInput"
import { Comment } from "./Comment"

type SortBy = "up" | "date-new" | "date-old"

export const Comments: Component<{ pageId: string }> = (props) => {
	const [sortBy, setSortBy] = createSignal("up" as SortBy)
	const comments = trpc.page.comments.useQuery(() => ({
		pageId: props.pageId,
		sortBy: sortBy(),
	}))

	return (
		<>
			<Show when={comments.data}>
				<div id="comments-container">
					<div class="comments-bar">
						<h1 id="comments-count">
							{comments.data.count} comments
						</h1>
						<select
							value={sortBy()}
							onChange={(e) => {
								setSortBy((e.target as any).value as any)
							}}
						>
							<option value="date-new">Newest</option>
							<option value="date-old">Oldest</option>
							<option value="up">Best</option>
						</select>
					</div>

					<CommentInput
						pageId={props.pageId}
						onSuccess={() => {
							setSortBy("date-new")
							comments.refetch()
						}}
					/>

					<For each={comments.data.data}>
						{(comment) => (
							<Comment
								comment={comment}
								pageId={props.pageId}
								onChange={() => comments.refetch()}
							/>
						)}
					</For>
				</div>
			</Show>
		</>
	)
}

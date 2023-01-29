import { Component, createEffect, Show } from "solid-js"
import trpc from "../trpc"
import { Config } from "../entry"

export const ReactionType = {
	Rocket: "Rocket",
	ThumbUp: "ThumbUp",
	ThumbDown: "ThumbDown",
	Happy: "Happy",
	Sad: "Sad",
	Party: "Party",
	Love: "Love",
	Eyes: "Eyes",
}
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType]

const reactionsMeta = {
	[ReactionType.ThumbUp]: ["👍", "thumb-up"],
	[ReactionType.ThumbDown]: ["👎", "thumb-down"],
	[ReactionType.Eyes]: ["👀", "eyes"],
	[ReactionType.Rocket]: ["🚀", "rocket"],
	[ReactionType.Party]: ["🎉", "party"],
	[ReactionType.Love]: ["❤️", "love"],
	[ReactionType.Sad]: ["😕", "sad"],
	[ReactionType.Happy]: ["😄", "happy"],
}

export const Reactions: Component<{ config: Config }> = (props) => {
	const reactions = trpc.page.reactions.useQuery(() => ({
		pageId: props.config.pageId,
	}))
	const react = trpc.page.react.useMutation({
		onSuccess() {
			reactions.refetch({})
		},
	})

	return (
		<>
			<div id="zf-reactions">
				<Show when={reactions.data}>
					{Object.entries(reactionsMeta).map(
						([reactionType, [emoji, id]]) => (
							<button
								class="zf-reaction"
								classList={{
									reacted: reactions.data[reactionType][1],
								}}
								id={id}
								onClick={async () => {
									await react.mutate({
										pageId: props.config.pageId,
										reactionType: reactionType,
									})
								}}
							>
								<div class="zf-reaction-emoji">{emoji}</div>
								<div class="zf-reaction-count">
									{reactions.data[reactionType][0]}
								</div>
							</button>
						)
					)}
				</Show>
			</div>
		</>
	)
}

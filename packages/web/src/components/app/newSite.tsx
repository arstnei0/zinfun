import { Component, createSignal } from "solid-js"
import { trpc } from "~/lib/trpc"

export const NewSitePage: Component = () => {
	const [name, setName] = createSignal("")
	const newSite = trpc.site.new.useMutation()

	return (
		<>
			<h1>Add a new site</h1>
			<input
				value={name()}
				onInput={(e) => setName((e.target as any).value)}
			></input>
			<button
				onClick={async () => {
					newSite.mutate({ name: name() })
				}}
			>
				Add
			</button>
		</>
	)
}

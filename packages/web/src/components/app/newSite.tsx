import { useNavigate } from "@solidjs/router"
import { Component, createSignal } from "solid-js"
import { trpc } from "~/lib/trpc"

export const NewSitePage: Component = () => {
	const [name, setName] = createSignal("")
	const newSite = trpc.site.new.useMutation()
	const navigate = useNavigate()

	return (
		<>
			<h1>Add a new site</h1>
			<input
				value={name()}
				onInput={(e) => setName((e.target as any).value)}
			></input>
			<button
				onClick={async () => {
					await newSite.mutate({ name: name() })
					navigate("/")
				}}
			>
				Add
			</button>
		</>
	)
}

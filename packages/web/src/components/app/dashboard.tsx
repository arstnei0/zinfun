import { Component, For, createEffect } from "solid-js"
import { session } from "."
import { trpc } from "~/lib/trpc"
import { useNavigate, Link } from "@solidjs/router"

export const Dashboard: Component = () => {
	const sites = trpc.site.all.useQuery()
	const navigate = useNavigate()

	return (
		<>
			<h1>Dashboard</h1>
			<button
				onClick={async () => {
					navigate("/site/new")
				}}
			>
				Add a new site
			</button>
			<For each={sites.data || []}>
				{(site) => (
					<Link href={`/site/${site.id}`}>
						<h1>{site.name}</h1>
					</Link>
				)}
			</For>
		</>
	)
}

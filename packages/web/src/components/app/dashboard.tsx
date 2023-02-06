import { Component, For, createEffect } from "solid-js"
import { session } from "."
import { trpc } from "~/lib/trpc"
import { useNavigate, Link } from "@solidjs/router"
import { Button } from "zulse/Button"

export const Dashboard: Component = () => {
	const sites = trpc.site.all.useQuery()
	const navigate = useNavigate()

	return (
		<>
			<h1>Dashboard</h1>
			<div id="sites-header">
				<h1>Sites</h1>
				<div id="new-site-btn">
					<Button
						onClick={async () => {
							navigate("/site/new")
						}}
					>
						Add a new site
					</Button>
				</div>
			</div>
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

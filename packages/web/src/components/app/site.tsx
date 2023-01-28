import { useNavigate, useParams } from "@solidjs/router"
import { Component, For, Show } from "solid-js"
import { trpc } from "~/lib/trpc"

export const SitePage: Component = () => {
	const siteId = useParams().id as string
	const site = trpc.site.get.useQuery(() => ({
		id: siteId,
	}))
	const pages = trpc.page.all.useQuery(() => ({ siteId }))
	const navigate = useNavigate()

	return (
		<>
			<Show when={site.data}>
				<h1>Site: {site.data?.name}</h1>
				<button onClick={() => navigate(`/integrate/${siteId}`)}>
					Integrate in your website
				</button>
				<h1>Pages of this site</h1>
				<Show when={pages.data}>
					<For each={pages.data}>
						{(page) => (
							<>
								<h3>{page.name}</h3>
							</>
						)}
					</For>
				</Show>
			</Show>
		</>
	)
}

import { useParams } from "@solidjs/router"
import { Component, onMount } from "solid-js"
import { Portal } from "solid-js/web"

export const IntegratePage: Component = () => {
	const siteId = useParams().id as string
	onMount(() => {
		const scriptEl = document.createElement("script")
		scriptEl.src = "/static/script.iife.js"
		scriptEl.dataset.id = siteId
		scriptEl.dataset.apiUrl = "https://localhost:3000/api/trpc"
		document.body.appendChild(scriptEl)
	})

	return <></>
}

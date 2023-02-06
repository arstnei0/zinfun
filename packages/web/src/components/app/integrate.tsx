import { useParams } from "@solidjs/router"
import { Component, onMount } from "solid-js"

export const IntegratePage: Component = () => {
	const siteId = useParams().id as string
	onMount(() => {
		const scriptEl = document.createElement("script")
		scriptEl.src = "/static/zinfun-script.iife.js"
		scriptEl.dataset.id = siteId
		scriptEl.dataset.apiUrl = "https://localhost:3000/api/trpc"
		document.body.appendChild(scriptEl)
		const styleEl = document.createElement("link")
		styleEl.rel = "stylesheet"
		styleEl.href = "/static/style.css"
		document.head.appendChild(styleEl)
	})

	return <></>
}

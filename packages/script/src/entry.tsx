import { z } from "zod"
import { render } from "solid-js/web"
import { Zinfun } from "./Zinfun"

const Config = z.object({
	id: z.string(),
	pageId: z.string().default(window.location.pathname),
	selector: z.string().default("append"),
	showViews: z.coerce.boolean().default(true),
	showReactions: z.coerce.boolean().default(true),
	apiUrl: z.string().default("https://zinfun.vercel.app/api/trpc"),
})
export type Config = z.infer<typeof Config>

const scriptEl = document.currentScript as HTMLOrSVGScriptElement
const config: Config = Config.parse({ ...scriptEl.dataset })
const rootEl =
	config.selector === "append"
		? (() => {
				const containerEl = document.createElement("div")
				containerEl.className = "zinfun-append-container"
				scriptEl.insertAdjacentElement("afterend", containerEl)
				return containerEl
		  })()
		: (() => {
				const el = document.querySelector(config.selector)
				if (!el) throw new Error("Zinfun: Root element not found!")
				return el
		  })()

render(
	() => (
		<Zinfun
			pageId={config.pageId}
			siteId={config.id}
			apiUrl={config.apiUrl}
			showViews={config.showViews}
			showReactions={config.showReactions}
		></Zinfun>
	),
	rootEl
)

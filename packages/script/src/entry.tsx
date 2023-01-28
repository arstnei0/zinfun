import { z } from "zod"
import UI from "./ui"
import { render } from "solid-js/web"
import { trpc, client, queryClient } from "./trpc"

const Config = z.object({
	id: z.string(),
	pageId: z.string().default(window.location.pathname),
	selector: z.string().default("append"),
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
		<trpc.Provider client={client} queryClient={queryClient}>
			<UI config={config} />
		</trpc.Provider>
	),
	rootEl
)

import { Component, createContext } from "solid-js"
import { client, queryClient, trpc } from "~/lib/trpc"
import { Route, Router, Routes } from "@solidjs/router"
import { Dashboard } from "./dashboard"
import "./styles/global.sass"
import { Session } from "zihan-auth-core/types"
import { LoginPage } from "./login"
import { NewSitePage } from "./newSite"

export const session: Session = JSON.parse(
	document.querySelector("#session")?.innerHTML || "null"
)

export const App: Component = () => {
	if (window.location.pathname !== "/app/login" && !session?.user) {
		window.location.pathname = "/app/login"
	}

	return (
		<trpc.Provider client={client} queryClient={queryClient}>
			<main>
				<Router base="/app">
					<Routes>
						<Route path="/" component={Dashboard}></Route>
						<Route path="/login" component={LoginPage}></Route>
						<Route path="/site/new" component={NewSitePage}></Route>
					</Routes>
				</Router>
			</main>
		</trpc.Provider>
	)
}

import { Component } from "solid-js"
import { client, queryClient, trpc } from "~/lib/trpc"

export const App: Component = () => {
	return (
		<trpc.Provider client={client} queryClient={queryClient}>
			<Test />
		</trpc.Provider>
	)
}

export const Test = () => {
	const msg = trpc.test.useQuery()

	return <h1>{msg.data}</h1>
}

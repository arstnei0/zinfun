import { Component } from "solid-js"
import { signIn } from "@auth/solid-start/client"

export const LoginPage: Component = () => {
	return (
		<>
			<div id="login-page">
				<h1>Login</h1>
				<button
					onClick={() => {
						signIn("github", { callbackUrl: "/app" })
					}}
				>
					Login with Github
				</button>
			</div>
		</>
	)
}

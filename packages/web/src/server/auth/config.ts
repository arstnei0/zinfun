import { AuthConfig } from "zihan-auth-core"
import { serverEnv } from "~/env/server"
import GithubProvider from "zihan-auth-core/providers/github"

export const authConfig: AuthConfig = {
	providers: [
		// @ts-ignore types error
		GithubProvider({
			clientId: serverEnv.GITHUB_ID,
			clientSecret: serverEnv.GITHUB_SECRET,
		}),
	],
	secret: serverEnv.SECRET,
}

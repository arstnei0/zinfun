import { AuthConfig } from "@auth/core"
import { serverEnv } from "~env/server"
import GithubProvider from "@auth/core/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "db"

export const authConfig: AuthConfig = {
	providers: [
		// @ts-ignore types error
		GithubProvider({
			clientId: serverEnv.GITHUB_ID,
			clientSecret: serverEnv.GITHUB_SECRET,
		}),
	],
	secret: serverEnv.SECRET,
	adapter: PrismaAdapter(prisma),
}

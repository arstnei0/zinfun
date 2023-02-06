import { AuthConfig } from "@auth/core"
import GithubProvider from "@auth/core/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "db"

export const authConfig: AuthConfig = {
	providers: [
		// @ts-ignore types error
		GithubProvider({
			clientId: import.meta.env.GITHUB_ID,
			clientSecret: import.meta.env.GITHUB_SECRET,
		}),
	],
	secret: import.meta.env.SECRET,
	adapter: PrismaAdapter(prisma),
}

import { Auth } from "@auth/core"
import { APIRoute } from "astro"
import { authConfig } from "~server/auth/config"

const handler: APIRoute = async (ctx) => {
	const response = await Auth(ctx.request, authConfig)

	return response
}

export const get = handler
export const post = handler

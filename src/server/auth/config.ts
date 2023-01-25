import { AuthConfig } from "zihan-auth-core"
import { serverEnv } from "~/env/server"

export const authConfig: AuthConfig = {
	providers: [],
	secret: serverEnv.SECRET,
}

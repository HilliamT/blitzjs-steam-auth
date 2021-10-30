import router from "app/lib/router"
import { Ctx, Middleware } from "blitz"

export const middleware: Middleware[] = [
  async (req, res, next) => {
    await router.run(req, res)
    res.blitzCtx.user = (req as any).user
    await next()
  },
]

export default async function getCurrentUser(_ = null, { session, user }: Ctx) {
  if (user == null) return { loggedIn: false }
  return { ...user, loggedIn: true }
}

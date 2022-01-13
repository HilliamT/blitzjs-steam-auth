import router from "app/lib/router"
import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const config: BlitzConfig = {
  middleware: [
    async (req, res, next) => {
      await router.run(req, res)
      res.blitzCtx.user = (req as any).user
      await next()
    },
    sessionMiddleware({
      cookiePrefix: "blitzjs-steam-auth",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config

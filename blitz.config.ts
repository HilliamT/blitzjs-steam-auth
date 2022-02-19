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
  env: {
    SESSION_SECRET: process.env.SESSION_SECRET,
    DOMAIN: process.env.DOMAIN,
    STEAM_API_KEY: process.env.STEAM_API_KEY,
  },
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

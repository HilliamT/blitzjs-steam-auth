import { Ctx, getSession, MiddlewareRequest as Req, MiddlewareResponse as Res } from "blitz"
import httpMocks from "node-mocks-http"

// This import is crucial, as it modifies global state by calling sessionMiddleware
// Most importantly, this sets the isAuthorized method in global.sessionConfig
import "../blitz.config"

interface CreateMockContextOptions {
  user?: Ctx["user"]
  reqOptions?: httpMocks.RequestOptions
  resOptions?: httpMocks.ResponseOptions
}

// Based on https://github.com/blitz-js/blitz/issues/2654#issuecomment-904426530
// Creates a mock context for use in tests and scripts. Attempts to make it the
// "real deal" by calling the same initialization logic that creates actual
// session contexts.
export default async function createMockContext<C extends Ctx>({
  user,
  reqOptions,
  resOptions,
}: CreateMockContextOptions = {}) {
  const mocks = httpMocks.createMocks<any, any>(reqOptions, resOptions)
  const mockReq: Req = mocks.req
  const mockRes: Res<C> = mocks.res

  // Ensures the response has the blitzCtx object which is required for
  // authorization checks
  await getSession(mockReq, mockRes)

  // Simulate login by saving public session data
  if (user) {
    mockRes.blitzCtx.user = user
  }

  return { req: mockReq, res: mockRes, ctx: mockRes.blitzCtx }
}

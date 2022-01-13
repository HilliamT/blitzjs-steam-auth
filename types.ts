import { DefaultCtx } from "blitz"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    user: { loggedIn: boolean; id?: string; displayName?: string; photos?: { value: string }[] }
  }
}

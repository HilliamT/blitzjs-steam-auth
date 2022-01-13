import { Ctx } from "blitz"

export default async function getCurrentUser(_ = null, { user }: Ctx) {
  if (user == null) return { loggedIn: false }
  return { ...user, loggedIn: true }
}

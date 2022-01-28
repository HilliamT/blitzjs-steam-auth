import getCurrentUser from "app/queries/getCurrentUser"
import createMockContext from "test/createMockContext"

it("Retrieve current user", async () => {
  const testUser = { user: { loggedIn: true, id: "1", displayName: "Test User" } }
  const { ctx } = await createMockContext(testUser)
  await expect(getCurrentUser(null, ctx)).resolves.toMatchObject(testUser.user)
})

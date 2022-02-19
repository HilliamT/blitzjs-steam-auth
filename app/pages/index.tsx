import { BlitzPage, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <div className="text-center flex justify-center">
      {currentUser.loggedIn ? (
        <div>
          Welcome back!
          <br />
          From logging in, your SteamID is {currentUser.id}.<br />
          You can call other APIs to get more information within `getServerSideProps` or within
          `lib/passport.ts`.
          <br />
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <div>
          Welcome!
          <br />
          <Link href="/api/auth/login">
            <img className="cursor-pointer" src="https://backpack.tf/images/sits_small.png" />
          </Link>
        </div>
      )}
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

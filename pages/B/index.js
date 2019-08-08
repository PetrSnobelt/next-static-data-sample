import dynamic from "next/dynamic"
import Link from "next/link"

import Debug from "../../components/debug"
import Navigation from "../../components/navigation"

function PageB(props) {
  return (
    <main>
      <Debug {...props} />
      <Navigation />

      <h4>Navigation using link tag</h4>
      <nav>
        <Link href={{ pathname: '/B', query: { name: 'now' } }} as="/B/now">
          <a>now</a>
        </Link>
        {` | `}
        <Link href={{ pathname: '/B', query: { name: 'next' } }} as="/B/next">
          <a>next</a>
        </Link>
      </nav>
    </main>
  )
}

PageB.getInitialProps = async ({ req, pathname, query }) => {
  const { name = "now" } = query
  const data = await import(`../../static/${name}.json`)
  // console.log("dynamicData", data)

  return { pathname, query, data }
}

export default PageB

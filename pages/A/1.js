import Link from "next/link"
import fetch from "isomorphic-unfetch"

const pages = ["now", "next", "orbit-components"]

const Page = props => (
  <main>
    <h1>index</h1>
    <pre>
      <code>{JSON.stringify(props, null, 2)}</code>
    </pre>
    <h4>Navigation using a tag with query</h4>
    <nav>
      <a href="?name=now">now</a> | <a href="?name=next">next</a>
    </nav>

    <h4>Navigation using a tag with url</h4>
    <nav>
      <a href="now">now</a> | <a href="next">next</a>
    </nav>
  </main>
)

Page.getInitialProps = async ({ req, pathname, query }) => {
  // Check for server - different options
  const isServer = !!req
  const isBrowser = !!process.browser
  const isBrowser2 = typeof window !== 'undefined';

  const props = { pathname, query, isServer, isBrowser, isBrowser2 }
  const { name = "now" } = query
  if (isServer) {
    const fs = require("fs") // disable fs in browser in package.json
    props.file = JSON.parse(
      fs.readFileSync(
        `/Users/petrsnobelt/Projects/next-static-data-sample/static/${name}.json`,
        "utf-8"
      )
    )
  }
  return props
}

export default Page

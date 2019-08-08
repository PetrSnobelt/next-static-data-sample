import Link from "next/link"
import fetch from "isomorphic-unfetch"

const pages = ["now", "next", "orbit-components"]

const Page = props => (
  <main>
    <h1>index</h1>
    <pre>
      <code>{JSON.stringify(props, null, 2)}</code>
    </pre>
    <h4>Navigation using a tag</h4>
    <nav>
      <a href="/now">now</a> | <a href="/next">next</a>
    </nav>

    <h4>Navigation using link tag</h4>
    <Link href="/[name]" as={`/now/`}>
      <a>now</a>
    </Link>
    {` | `}
    <Link href="/[name]" as={`/next/`}>
      <a>next</a>
    </Link>
  </main>
)

Page.getInitialProps = async ({ req, pathname, query }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent
  const isServer = !!req

  const props = { userAgent, pathname, query, isServer }
  const { name } = query
  if (isServer) {
    console.log("host", req.headers.host, req.url)
    // console.log("req", req)
    const fs = require("fs") // disable fs in browser in package.json
    console.log("dirname", __dirname)
    props.file = JSON.parse(
      fs.readFileSync(
        `/Users/petrsnobelt/Projects/next-static-data-sample/static/${name}.json`,
        "utf-8"
      )
    )
  }
  props.staticRender = req && !req.headers.host
  if (!props.staticRender) {
    const url = isServer
      ? `http://${req.headers.host}/static/${name}.json`
      : `/static/${name}.json`
    const res = await fetch(url, {
      headers: { Accept: "application/json" }
    })
    props.json = await res.json()
  }
  return props
}

export default Page

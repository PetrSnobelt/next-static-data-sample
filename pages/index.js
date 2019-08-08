const Page = props => (
  <main>
    <h1>index</h1>
    <pre>
      <code>{JSON.stringify(props, null, 2)}</code>
    </pre>
  </main>
)

Page.getInitialProps = async ({ req, pathname, query }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent
  return { userAgent, pathname, query }
}

export default Page

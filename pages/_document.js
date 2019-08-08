// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    if (ctx.req && ctx.req.url.includes("favicon.ico")) ctx.res.end()
    ctx.query.sameData = 1
    const initialProps = await Document.getInitialProps(ctx)
    // console.log("ctx", ctx)
    // console.log("initialProps", initialProps)
    return { ...initialProps, someOtherProps:1 }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <h1>NextJS & Static data</h1>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
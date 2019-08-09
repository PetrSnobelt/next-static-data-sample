import React from 'react'
import App, { Container } from 'next/app'
import Counter from '../components/counter'
import Debugger from '../components/debug'

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {}
  //
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }
  //
  //   return { pageProps }
  // }

  render() {
    const { Component, pageProps, router } = this.props

    return (
      <Container>
        <Component {...pageProps} />
        <Counter />

        <hr />
        Query in `_app.js`
        <Debugger {...router.query} />

      </Container>
    )
  }
}

export default MyApp
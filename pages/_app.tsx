import App, { Container } from 'next/app'

import Head from 'next/head'
import { Provider } from 'react-redux'
import React from 'react'
import { configureStore } from 'modules/main/configureStore'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

export class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Head>
          <title>My new cool app</title>
        </Head>

        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(configureStore)(withReduxSaga({ async: true })(MyApp))

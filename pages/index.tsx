import { CounterConnected } from 'modules/counter/containers/CounterConnected'
import { Layout } from 'common/layout/Layout'
import React from 'react'

export default () => {
  const next = () => 1

  return (
    <Layout title="Home | Next.js + TypeScript">
      <CounterConnected next={next}>Click me</CounterConnected>
    </Layout>
  )
}

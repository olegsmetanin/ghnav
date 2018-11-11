import * as React from 'react'

import Head from 'next/head'

export interface ILayoutProps {
  title?: string
}

export const Layout: React.SFC<ILayoutProps> = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </div>
)

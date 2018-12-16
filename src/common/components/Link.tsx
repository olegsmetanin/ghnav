import * as React from 'react'
import * as url from 'url'

import { ASSET_PREFIX } from 'common/config'
import { LinkProps } from 'next/link'
import NextLink from 'next/link'

export class Link extends React.Component<LinkProps, {}> {
  render() {
    const { href, as, ...props } = this.props
    const { query } = href as url.UrlObject
    const { pathname } = href as url.UrlObjectCommon
    return (
      <NextLink
        href={href}
        as={{ pathname: `${ASSET_PREFIX}${pathname}`, query }}
        {...props}
      />
    )
  }
}

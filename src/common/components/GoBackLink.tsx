import * as React from 'react'

import { IWithHistoryProps, withHistory } from 'common/history/withHistory'

import { Link } from 'common/components/Link'
import { LinkProps } from 'next/link'

export interface IBaseGoBackLinkProps extends IWithHistoryProps, LinkProps {}

export class BaseGoBackLink extends React.Component<IBaseGoBackLinkProps, {}> {
  onClick = e => {
    e.stopPropagation()
    e.preventDefault()
    this.props.history.back()
  }

  render() {
    const { children, history: hs, ...props } = this.props
    // const {  } = this.props
    const { href } = props

    const match = hs.matchPreviousPathname(href)

    return (
      // Do not pass router and history in Link
      <Link {...props}>
        {match ? <span onClick={this.onClick}>{children}</span> : children}
      </Link>
    )
  }
}

export const GoBackLink = withHistory(BaseGoBackLink)

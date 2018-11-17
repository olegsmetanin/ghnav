import { IHistory, history } from 'common/history'

import Link from 'next/link'
import React from 'react'
import { withProps } from 'common/hoc/withProps'

interface IBaseGoBackLinkProps {
  href: any
  history?: IHistory
}

export class BaseGoBackLink extends React.Component<IBaseGoBackLinkProps, {}> {
  onClick = e => {
    e.stopPropagation()
    e.preventDefault()
    this.props.history.back()
  }

  render() {
    const { children, history: hist, ...props } = this.props
    const { href } = props

    const match = hist.matchPreviousPathname(href)

    return (
      // Do not pass router and history in Link
      <Link {...props}>{match ? <span onClick={this.onClick}>{children}</span> : children}</Link>
    )
  }
}

export const GoBackLink = withProps(() => ({ history }))(BaseGoBackLink)

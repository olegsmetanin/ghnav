import Link from 'next/link'
import React from 'react'
// import Router from 'next/router'
import { history as globalHistory } from 'common/history'
import { withRouter } from 'next/router'

interface IBaseGoBackLinkProps {
  href: any
  router: any
  history?: any
}

export class BaseGoBackLink extends React.Component<IBaseGoBackLinkProps, {}> {
  onClick = e => {
    e.stopPropagation()
    e.preventDefault()
    this.props.router.back()
  }

  render() {
    const { children, router, history, ...props } = this.props
    const { href } = props

    const match = (history || globalHistory).matchPrevious(href)

    return (
      // Do not pass router and history in Link
      <Link {...props}>{match ? <span onClick={this.onClick}>{children}</span> : children}</Link>
    )
  }
}

export const GoBackLink = withRouter(BaseGoBackLink)

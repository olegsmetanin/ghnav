import Router from 'next/router'
import { isMatch } from 'lodash'
import { qs2json } from 'common/utils/qs2json'

// TODO: write HOC withHistory
export class History {
  history = []

  constructor(router) {
    router.events.on('routeChangeComplete', url => {
      this.push(url)
    })
  }

  push = url => {
    const index = url.indexOf('?')
    const pathname = url.substr(0, index)
    const query = qs2json(url)
    const hr = { pathname, query }

    this.history.unshift(hr)
  }

  previous = () => {
    return this.history.length > 0 ? this.history[0] : null
  }

  matchPrevious = linkHref => {
    const previous = this.previous()
    const matched = isMatch(previous, linkHref)
    return matched
  }

  get = () => this.history
}

export const history = new History(Router)

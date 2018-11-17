import Router from 'next/router'
import { isMatch } from 'lodash'
import { qs2json } from 'common/utils/qs2json'
import { qs2pathname } from 'common/utils/qs2pathname'

export interface IHistoryEntity {
  pathname: string
  query: object
}

export interface IHistory {
  get: () => IHistoryEntity[]
  push: (url) => void
  matchPrevious: (IHistoryEntity) => boolean
  matchPreviousPathname: (IHistoryEntity) => boolean
  isComeBack: boolean
  back: () => void
}

export class History implements IHistory {
  history = []

  router = null

  isComeBack = false

  constructor(router) {
    this.router = router
    if (typeof window !== 'undefined') {
      this.push(window.location.pathname + window.location.search)
    }

    router.events.on('routeChangeComplete', url => {
      this.isComeBack = false
      this.push(url)
    })
  }

  push = url => {
    const pathname = qs2pathname(url)
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

  matchPreviousPathname = linkHref => {
    const previous = this.previous()
    const matched = previous && linkHref.pathname === previous.pathname
    return matched
  }

  back = () => {
    this.isComeBack = true
    this.router.back()
  }

  get = () => this.history
}

export const history = new History(Router)

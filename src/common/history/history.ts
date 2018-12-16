import { ASSET_PREFIX } from 'common/config'
import Router from 'next/router'
import { isMatch } from 'lodash'
import { json2router } from 'common/utils/json2router'
import { qs2json } from 'common/utils/qs2json'
import { qs2pathname } from 'common/utils/qs2pathname'

export interface IHistoryEntity {
  pathname: string
  query: object
}

export interface IHistory {
  get: () => IHistoryEntity[]
  push: (urlLike: any, options?: any) => void
  matchPrevious: (IHistoryEntity) => boolean
  matchPreviousPathname: (IHistoryEntity) => boolean
  back: () => void
}

export class History implements IHistory {
  history = []

  router = null

  constructor(router) {
    this.router = router
    if (typeof window !== 'undefined') {
      const currentPath =
        window.location.pathname.slice(ASSET_PREFIX.length) +
        window.location.search
      this.pushUrl(currentPath)
    }

    router.events.on('routeChangeComplete', url => {
      const currentPath = url.slice(ASSET_PREFIX.length)
      this.pushUrl(currentPath)
    })
  }

  pushUrl = url => {
    const pathname = qs2pathname(url)
    const query = qs2json(url)
    const hr = { pathname, query }

    this.history.unshift(hr)
  }

  push = (urlLike: any, options?: any) => {
    const pathname = urlLike.pathname
    const query = json2router(urlLike.query)
    this.history.unshift(urlLike)

    this.router.push(
      {
        pathname,
        query
      },
      {
        pathname: `${ASSET_PREFIX}${pathname}`,
        query
      },
      options
    )
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
    this.router.back()
  }

  get = () => this.history
}

export const history = new History(Router)

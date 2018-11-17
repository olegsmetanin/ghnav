/* eslint-env jest */
import { History, history } from '../'

import EventEmitter from 'events'

describe('history', () => {
  it('works', async () => {
    expect(history.previous()).toEqual({ pathname: '/', query: { '/': '' } })
    history.push('issue?owner=zeit&repo=next.js&number=5638')
    expect(history.get()).toEqual([
      { pathname: 'issue', query: { number: '5638', owner: 'zeit', repo: 'next.js' } },
      { pathname: '/', query: { '/': '' } }
    ])
    const match0 = history.matchPrevious({ pathname: '/', query: { owner: 'owner', repo: 'repo' } })
    expect(match0).toBe(false)
    const match1 = history.matchPrevious({ pathname: 'issue', query: { owner: 'zeit', repo: 'next.js' } })
    expect(match1).toBe(true)
    const match2 = history.matchPrevious({
      pathname: 'issue',
      query: { owner: 'zeit', repo: 'next.js', number: '5638' }
    })
    expect(match2).toBe(true)
    const match3 = history.matchPreviousPathname({
      pathname: 'issue',
      query: { owner: 'zeit', repo: 'next.js', number: '5638' }
    })
    expect(match3).toBe(true)

    const emitter = new EventEmitter()

    const router = {
      events: emitter,
      back: jest.fn()
    }

    const hs = new History(router)

    hs.back()
    expect(router.back.mock.calls.length).toBe(1)

    emitter.emit('routeChangeComplete', 'issue?owner=zeit&repo=next.js&number=5638')

    await new Promise(resolve => setImmediate(resolve))

    expect(hs.history).toEqual([
      { pathname: 'issue', query: { number: '5638', owner: 'zeit', repo: 'next.js' } },
      { pathname: '/', query: { '/': '' } }
    ])
  })
})

/* eslint-env jest */
import { History, history } from '../'

import EventEmitter from 'events'

describe('history', () => {
  it('works', async () => {
    expect(history.previous()).toEqual(null)
    history.push('issue?owner=zeit&repo=next.js&num=5638')
    expect(history.get()).toEqual([{ pathname: 'issue', query: { num: '5638', owner: 'zeit', repo: 'next.js' } }])
    const match0 = history.matchPrevious({ pathname: '/', query: { owner: 'owner', repo: 'repo' } })
    expect(match0).toBe(false)
    const match1 = history.matchPrevious({ pathname: 'issue', query: { owner: 'zeit', repo: 'next.js' } })
    expect(match1).toBe(true)
    const match2 = history.matchPrevious({ pathname: 'issue', query: { owner: 'zeit', repo: 'next.js', num: '5638' } })
    expect(match2).toBe(true)

    const emitter = new EventEmitter()

    const hs = new History({ events: emitter })
    emitter.emit('routeChangeComplete', 'issue?owner=zeit&repo=next.js&num=5638')

    await new Promise(resolve => setImmediate(resolve))

    expect(hs.history).toEqual([{ pathname: 'issue', query: { owner: 'zeit', repo: 'next.js', num: '5638' } }])
  })
})

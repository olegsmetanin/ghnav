/* eslint-env jest */
import { json2qs } from '../json2qs'

describe('json2qs', () => {
  it('trim', () => {
    expect(json2qs({ a: { b: { c: 1, d: 2 } } })).toEqual('a.b.c=1&a.b.d=2')
    expect(
      json2qs({ owner: 'owner', repo: 'repo', filter: { state: 'all' } })
    ).toEqual('owner=owner&repo=repo&filter.state=all')
  })
})

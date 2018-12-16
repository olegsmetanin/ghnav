/* eslint-env jest */
import { json2router } from '../json2router'

describe('json2router', () => {
  it('trim', () => {
    expect(json2router({ a: { b: { c: 1, d: 2 } } })).toEqual({
      'a.b.c': 1,
      'a.b.d': 2
    })
    expect(
      json2router({
        owner: 'owner',
        qwe: [{ id: 1 }, { id: 2 }]
      })
    ).toEqual({ owner: 'owner', 'qwe.0.id': 1, 'qwe.1.id': 2 })
    expect(
      json2router(
        { a: { b: { c: 1, d: 2 } } },
        {
          safe: true
        }
      )
    ).toEqual({ 'a.b.c': 1, 'a.b.d': 2 })
    expect(json2router({ a: { b: { c: 1, d: {} } } }, { maxDepth: 2 })).toEqual(
      { 'a.b': { c: 1, d: {} } }
    )
  })
})

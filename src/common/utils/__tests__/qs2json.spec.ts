/* eslint-env jest */
import { qs2json } from '../qs2json'

describe('qs2json', () => {
  it('trim', () => {
    expect(qs2json('/qwe?asd=123')).toEqual({ asd: '123' })
    expect(qs2json('/?asd=123')).toEqual({ asd: '123' })
    expect(qs2json('?asd=123')).toEqual({ asd: '123' })
    expect(qs2json('asd=123')).toEqual({ asd: '123' })
    expect(qs2json('/qwe')).toEqual({})
    expect(qs2json('')).toEqual({})
  })
})

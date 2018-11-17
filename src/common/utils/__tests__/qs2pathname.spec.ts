/* eslint-env jest */
import { qs2pathname } from '../qs2pathname'

describe('qs2pathname', () => {
  it('trim', () => {
    expect(qs2pathname('')).toEqual('/')
    expect(qs2pathname('/qwe?asd=123')).toEqual('/qwe')
    expect(qs2pathname('/')).toEqual('/')
  })
})

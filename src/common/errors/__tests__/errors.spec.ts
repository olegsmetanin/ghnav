/* eslint-env jest */
import { RepoNotDefinedError } from '../'

describe('RepoNotDefinedError', () => {
  it('works', () => {
    try {
      throw new RepoNotDefinedError('repo is not defined')
    } catch (err) {
      expect(err.message).toEqual('repo is not defined')
    }
  })
})

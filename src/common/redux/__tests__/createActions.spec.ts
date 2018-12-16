import { createActions } from '../createActions'

describe('createActions', () => {
  it('works', () => {
    const { actionTypes, failure, load, loadSuccess } = createActions('ISSUE')
    expect(actionTypes.FAILURE).toEqual('ISSUE/FAILURE')
    expect(failure('error')).toEqual({ type: 'ISSUE/FAILURE', error: 'error' })
    expect(load({ repo: 'repo' })).toEqual({
      type: 'ISSUE/LOAD',
      payload: { repo: 'repo' }
    })
    expect(loadSuccess({ repo: 'repo' })).toEqual({
      type: 'ISSUE/LOAD_SUCCESS',
      payload: { repo: 'repo' }
    })
  })
})

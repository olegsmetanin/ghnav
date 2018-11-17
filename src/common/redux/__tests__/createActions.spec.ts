import { createActions } from '../createActions'

describe('createActions', () => {
  it('works', () => {
    const { actionTypes, failure, load, loadSuccess } = createActions('ISSUE')
    expect(actionTypes.FAILURE).toEqual('ISSUE/FAILURE')
    expect(failure('error')).toEqual({ type: 'ISSUE/FAILURE', error: 'error' })
  })
})

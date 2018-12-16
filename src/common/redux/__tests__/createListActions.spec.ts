import { createListActions } from '../createListActions'

describe('createListActions', () => {
  it('works', () => {
    const { actionTypes, failure, load, loadSuccess } = createListActions(
      'ISSUE'
    )
    expect(actionTypes.FAILURE).toEqual('ISSUE_LIST/FAILURE')
    expect(failure('error')).toEqual({
      type: 'ISSUE_LIST/FAILURE',
      error: 'error'
    })
    expect(load({ repo: 'repo' })).toEqual({
      type: 'ISSUE_LIST/LOAD',
      payload: { repo: 'repo' }
    })
    expect(loadSuccess({ repo: 'repo' })).toEqual({
      type: 'ISSUE_LIST/LOAD_SUCCESS',
      payload: { repo: 'repo' }
    })
  })
})

import { failure, load, loadSuccess } from '../listActions'
/* eslint-env jest */
import { issueListErrorSelector, issueListQuerySelector, issueListValueSelector } from '../listSelectors'

import { listReducer } from '../listReducer'

describe('IssueList reducer', () => {
  it('work well with selectors', () => {
    const state = { issueList: {} }

    state.issueList = [
      load({ qwe: 123 }),
      loadSuccess({ query: { qwe: 123 }, value: { asd: 123 } }),
      failure({ error: 'error' })
    ].reduce((a, b) => {
      return listReducer(a, b)
    }, state.issueList)

    expect(state.issueList).toEqual({ value: { asd: 123 }, query: { qwe: 123 }, error: { error: 'error' } })

    expect(issueListValueSelector(state)).toEqual({ asd: 123 })
    expect(issueListQuerySelector(state)).toEqual({ qwe: 123 })
    expect(issueListErrorSelector(state)).toEqual({ error: 'error' })
  })
})

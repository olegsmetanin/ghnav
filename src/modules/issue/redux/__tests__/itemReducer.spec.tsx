import { failure, load, loadSuccess } from '../itemActions'
/* eslint-env jest */
import { issueErrorSelector, issueQuerySelector, issueValueSelector } from '../itemSelectors'

import { itemReducer } from '../itemReducer'

describe('Issue reducers', () => {
  it('work well with selectors', () => {
    const state = { issue: {} }

    state.issue = [
      load({ qwe: 123 }),
      loadSuccess({ query: { qwe: 123 }, value: { asd: 123 } }),
      failure({ error: 'error' })
    ].reduce((a, b) => {
      return itemReducer(a, b)
    }, state.issue)

    expect(state.issue).toEqual({ value: { asd: 123 }, query: { qwe: 123 }, error: { error: 'error' } })

    expect(issueValueSelector(state)).toEqual({ asd: 123 })
    expect(issueQuerySelector(state)).toEqual({ qwe: 123 })
    expect(issueErrorSelector(state)).toEqual({ error: 'error' })
  })
})

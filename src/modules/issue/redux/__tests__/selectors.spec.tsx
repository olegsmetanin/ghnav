/* eslint-env jest */
import { issueErrorSelector, issueQuerySelector, issueValueSelector } from '../itemSelectors'

describe('Issue selectors', () => {
  it('should select value', () => {
    const state = { issue: { value: 7 } }
    expect(issueValueSelector(state)).toBe(7)
  })

  it('should select query', () => {
    const state = { issue: { query: 0 } }
    expect(issueQuerySelector(state)).toBe(0)
  })

  it('should select error', () => {
    const state = { issue: { error: 'error' } }
    expect(issueErrorSelector(state)).toBe('error')
  })
})

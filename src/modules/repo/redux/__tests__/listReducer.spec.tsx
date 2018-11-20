import { IState, listReducer } from '../listReducer'
import { failure, load, loadSuccess } from '../listActions'
/* eslint-env jest */
import { repoListErrorSelector, repoListQuerySelector, repoListValueSelector } from '../listSelectors'

describe('IssueList reducer', () => {
  it('work well with selectors', () => {
    const initState: IState = { process: null }

    const state = [
      load({ search: 'zeit' }),
      loadSuccess({ query: { search: 'zeit' }, value: [{ id: 1, owner: 'zeit', repo: 'next.js' }] }),
      failure({ error: 'error' })
    ].reduce((a, b) => {
      return listReducer(a, b)
    }, initState)

    expect(state).toEqual({
      error: { error: 'error' },
      process: {},
      query: { search: 'zeit' },
      value: [{ id: 1, owner: 'zeit', repo: 'next.js' }]
    })
    const fullState = { repoList: state }
    expect(repoListValueSelector(fullState)).toEqual([{ id: 1, owner: 'zeit', repo: 'next.js' }])
    expect(repoListQuerySelector(fullState)).toEqual({ search: 'zeit' })
    expect(repoListErrorSelector(fullState)).toEqual({ error: 'error' })
  })
})

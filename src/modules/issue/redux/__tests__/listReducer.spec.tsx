import { IState, listReducer } from '../listReducer'
import { failure, load, loadSuccess } from '../listActions'
/* eslint-env jest */
import { issueListErrorSelector, issueListQuerySelector, issueListValueSelector } from '../listSelectors'

describe('IssueList reducer', () => {
  it('work well with selectors', () => {
    const initState: IState = { process: null }

    const state = [
      load({ qwe: 123 }),
      loadSuccess({ query: { qwe: 123 }, value: [{ asd: 123 }] }),
      failure({ error: 'error' })
    ].reduce((a, b) => {
      return listReducer(a, b)
    }, initState)

    expect(state).toEqual({
      error: { error: 'error' },
      process: {},
      query: { qwe: 123 },
      value: [{ asd: 123 }]
    })
    const fullState = { issueList: state }
    expect(issueListValueSelector(fullState)).toEqual([{ asd: 123 }])
    expect(issueListQuerySelector(fullState)).toEqual({ qwe: 123 })
    expect(issueListErrorSelector(fullState)).toEqual({ error: 'error' })
  })

  it('LOAD_SUCCESS with additions', () => {
    const initState: IState = {
      value: [
        {
          id: 1,
          number: '1',
          owner: 'owner',
          repo: 'repo'
        }
      ]
    }

    const state = [
      load({ qwe: 123, add: true }),
      loadSuccess({ query: { qwe: 123, add: true }, value: [{ asd: 123 }] })
    ].reduce((a, b) => {
      return listReducer(a, b)
    }, initState)

    expect(state).toEqual({
      process: {},
      query: { add: true, qwe: 123 },
      value: [{ id: 1, number: '1', owner: 'owner', repo: 'repo' }, { asd: 123 }]
    })

    const fullState = { issueList: state }

    expect(issueListValueSelector(fullState)).toEqual([
      { id: 1, number: '1', owner: 'owner', repo: 'repo' },
      { asd: 123 }
    ])
    expect(issueListQuerySelector(fullState)).toEqual({ add: true, qwe: 123 })
  })
})

import { all } from 'redux-saga/effects'
import fetchMock from 'fetch-mock'
import { listSagas } from '../listSagas'
/* eslint-env jest */
import { load } from '../listActions'
import { mockStoreWithSaga } from 'common/testhelpers/mockStoreWithSaga'

describe('Issue list sagas', () => {
  afterEach(() => {
    fetchMock.restore()
    store.clearActions()
  })

  function* rootSaga() {
    yield all([...listSagas])
  }

  const store = mockStoreWithSaga({
    initial: { issueList: { value: null } },
    saga: rootSaga
  })

  it('should work with load action', async () => {
    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues?state=all&page=0&per_page=10', {
      status: 200,
      body: { qwe: 123 }
    })

    store.dispatch(
      load({
        owner: 'zeit',
        repo: 'next.js',
        page: 0,
        per_page: 10,
        filter: {
          state: 'all'
        }
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      {
        type: 'ISSUE_LIST/LOAD',
        payload: { owner: 'zeit', repo: 'next.js', page: 0, per_page: 10, filter: { state: 'all' } }
      },
      {
        type: 'ISSUE_LIST/LOAD_SUCCESS',
        payload: {
          query: { owner: 'zeit', repo: 'next.js', page: 0, per_page: 10, filter: { state: 'all' } },
          value: { qwe: 123 }
        }
      }
    ])
  })

  it('should work with failed action', async () => {
    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues?state=all&page=0&per_page=10', {
      status: 400,
      body: { error: 'Bad request' }
    })

    store.dispatch(
      load({
        owner: 'zeit',
        repo: 'next.js',
        page: 0,
        per_page: 10,
        filter: {
          state: 'all'
        }
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      {
        payload: { filter: { state: 'all' }, owner: 'zeit', page: 0, per_page: 10, repo: 'next.js' },
        type: 'ISSUE_LIST/LOAD'
      },
      { error: 'Bad Request', type: 'ISSUE_LIST/FAILURE' }
    ])
  })
})

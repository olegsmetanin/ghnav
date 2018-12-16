import { all } from 'redux-saga/effects'
import fetchMock from 'fetch-mock'
import { listSagas } from '../listSagas'
/* eslint-env jest */
import { load } from '../listActions'
import { mockStoreWithSaga } from 'common/testhelpers/mockStoreWithSaga'

describe('Repo list sagas', () => {
  afterEach(() => {
    fetchMock.restore()
    store.clearActions()
  })

  function* rootSaga() {
    yield all([...listSagas])
  }

  const store = mockStoreWithSaga({
    initial: { issueList: { value: [] } },
    saga: rootSaga
  })

  it('should work with load action', async () => {
    fetchMock.get(
      'https://api.github.com/search/repositories?q=zeit&sort=stars&order=desc',
      {
        status: 200,
        body: {
          items: [
            {
              id: 1,
              full_name: 'zeit/asd'
            }
          ]
        }
      }
    )

    store.dispatch(
      load({
        search: 'zeit'
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      { payload: { search: 'zeit' }, type: 'REPO_LIST/LOAD' },
      {
        payload: {
          query: { search: 'zeit' },
          value: [{ id: 1, owner: 'zeit', repo: 'asd' }]
        },
        type: 'REPO_LIST/LOAD_SUCCESS'
      }
    ])
  })

  it('should work with failed action', async () => {
    fetchMock.get(
      'https://api.github.com/search/repositories?q=zeit&sort=stars&order=desc',
      {
        status: 400,
        body: { error: 'Bad request' }
      }
    )

    store.dispatch(
      load({
        search: 'zeit'
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      { payload: { search: 'zeit' }, type: 'REPO_LIST/LOAD' },
      { error: 'Bad Request', type: 'REPO_LIST/FAILURE' }
    ])
  })

  it('should work with bad response', async () => {
    fetchMock.get(
      'https://api.github.com/search/repositories?q=zeit&sort=stars&order=desc',
      {
        status: 200,
        body: {}
      }
    )

    store.dispatch(
      load({
        search: 'zeit'
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      { payload: { search: 'zeit' }, type: 'REPO_LIST/LOAD' },
      { error: 'data is not an array', type: 'REPO_LIST/FAILURE' }
    ])
  })
})

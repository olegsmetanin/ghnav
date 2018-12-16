import { all } from 'redux-saga/effects'
import fetchMock from 'fetch-mock'
import { itemSagas } from '../itemSagas'
/* eslint-env jest */
import { load } from '../itemActions'
import { mockStoreWithSaga } from 'common/testhelpers/mockStoreWithSaga'

describe('Issue sagas', () => {
  afterEach(() => {
    fetchMock.restore()
    store.clearActions()
  })

  function* rootSaga() {
    yield all([...itemSagas])
  }

  const store = mockStoreWithSaga({
    initial: { issue: { value: {} } },
    saga: rootSaga
  })

  it('should work with load action', async () => {
    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/123', {
      status: 200,
      body: []
    })

    store.dispatch(
      load({
        owner: 'zeit',
        repo: 'next.js',
        number: '123'
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      {
        payload: { number: '123', owner: 'zeit', repo: 'next.js' },
        type: 'ISSUE/LOAD'
      },
      {
        payload: {
          query: { number: '123', owner: 'zeit', repo: 'next.js' },
          value: []
        },
        type: 'ISSUE/LOAD_SUCCESS'
      }
    ])
  })

  it('should work with failed action', async () => {
    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/123', {
      status: 400,
      body: { error: new Error('Bad request') }
    })

    store.dispatch(
      load({
        owner: 'zeit',
        repo: 'next.js',
        number: '123'
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      {
        payload: { number: '123', owner: 'zeit', repo: 'next.js' },
        type: 'ISSUE/LOAD'
      },
      { error: new Error('Bad Request'), type: 'ISSUE/FAILURE' }
    ])
  })

  it('should work with bad response', async () => {
    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/123', {
      status: 400,
      body: {}
    })

    store.dispatch(
      load({
        owner: 'zeit',
        repo: 'next.js',
        number: '123'
      })
    )

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      {
        payload: { number: '123', owner: 'zeit', repo: 'next.js' },
        type: 'ISSUE/LOAD'
      },
      { error: new Error('Bad Request'), type: 'ISSUE/FAILURE' }
    ])
  })
})

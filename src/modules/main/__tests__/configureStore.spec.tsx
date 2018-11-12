import { load, loadSuccess } from 'modules/issue/redux/itemActions'

import { cloneableGenerator } from 'redux-saga/utils'
import { configureStore } from 'modules/main/configureStore'
import createSagaMiddleware from 'redux-saga'
import fakeAPIResponse from 'modules/issue/containers/__tests__/issue.stab.json'
import fetchMock from 'fetch-mock'
import { put } from 'redux-saga/effects'
/* eslint-env jest */
import { rootSaga } from '../rootSaga'

describe('configureStore', () => {

  // const OLD_NODE_ENV = process.env.NODE_ENV

  // beforeEach(() => {
  //   jest.resetModules() // this is important
  //   delete process.env.NODE_ENV
  // })

  afterEach(() => {
    // process.env.NODE_ENV = OLD_NODE_ENV
    fetchMock.restore()
  })

  it('works', async () => {
    const store = configureStore({
      issue: { value: null }
    })

    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/5638', {
      status: 200,
      body: { qwe: 123 }
    })

    const query = {
      owner: 'zeit',
      repo: 'next.js',
      num: '5638'
    }

    store.dispatch(load(query))

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getState()).toEqual({
      issue: { value: { qwe: 123 }, query: { owner: 'zeit', repo: 'next.js', num: '5638' } }
    })
  })

  it('works with failure', async () => {
    const store = configureStore({
      issue: { value: null }
    })

    await new Promise(resolve => setImmediate(resolve))

    fetchMock.mock('https://api.github.com/repos/zeit/next.js/issues/5640', {
      status: 400,
      body: { error: 'no data' }
    })

    const query = {
      owner: 'zeit',
      repo: 'next.js',
      num: '5640'
    }

    store.dispatch(load(query))

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getState()).toEqual({issue: { error: 'Bad Request', value: null } })
  })

  // https://stackoverflow.com/questions/48033841/test-process-env-with-jest?rq=1
  // it('binds', async () => {
  //   const OLD = process.env.NODE_ENV
  //   process.env = {...process.env, NODE_ENV: 'production'}
  //   configureStore({
  //     issue: { value: null }
  //   })
  //   process.env = {...process.env, NODE_ENV: OLD}
  // })
})

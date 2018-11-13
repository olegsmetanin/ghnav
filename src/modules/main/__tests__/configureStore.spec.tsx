import { configureStore } from 'modules/main/configureStore'
import fetchMock from 'fetch-mock'
import { load } from 'modules/issue/redux/itemActions'

/* eslint-env jest */

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
      issue: { query: { num: '5638', owner: 'zeit', repo: 'next.js' }, value: { qwe: 123 } },
      issueList: { error: false, process: {} }
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

    expect(store.getState()).toEqual({
      issue: { error: 'Bad Request', value: null },
      issueList: { error: false, process: {} }
    })
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

/* eslint-env jest */
import Issue from '../issue'
import { Provider } from 'react-redux'
import React from 'react'
import { all } from 'redux-saga/effects'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import fakeAPIResponse from 'modules/issue/containers/__tests__/issue.stab.json'
import fetchMock from 'fetch-mock'
import { itemSagas as issueSagas } from 'modules/issue/redux/itemSagas'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
// import { rootSaga } from 'modules/main/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('Issue', () => {
  afterEach(fetchMock.restore)

  it('renders correct', async () => {
    const store = mockStore({ issue: { value: null } })
    const props = await Issue.getInitialProps({
      ctx: {
        store,
        asPath: '/issue?owner=zeit&repo=next.js&num=5638'
      }
    })
    const component = renderer.create(
      <Provider store={store}>
        <Issue {...props} />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('works correct with store', async () => {
    const store = mockStore({ issue: { value: null } })

    function* rootSaga() {
      yield all([...issueSagas])
    }

    store.runSagaTask = () => {
      store.sagaTask = sagaMiddleware.run(rootSaga)
    }

    store.runSagaTask()

    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/5638', {
      status: 200,
      body: fakeAPIResponse
    })

    const props = await Issue.getInitialProps({
      ctx: {
        store,
        asPath: '/issue?owner=zeit&repo=next.js&num=5638'
      }
    })

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions().map(el => el.type)).toEqual(['ISSUE/LOAD', 'ISSUE/LOAD_SUCCESS'])
  })

  it('works with errors', async () => {
    const store = mockStore({ issue: { value: null } })

    function* rootSaga() {
      yield all([...issueSagas])
    }

    store.runSagaTask = () => {
      store.sagaTask = sagaMiddleware.run(rootSaga)
    }

    store.runSagaTask()

    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/5638', {
      status: 404,
      body: { error: 'no data' }
    })

    const props = await Issue.getInitialProps({
      ctx: {
        store,
        asPath: '/issue?owner=zeit&repo=next.js&num=5638'
      }
    })

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions().map(el => el.type)).toEqual(['ISSUE/LOAD', 'ISSUE/FAILURE'])
  })
})

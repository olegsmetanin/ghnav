/* eslint-env jest */
import Issue from '../pages/issue'
import { Provider } from 'react-redux'
import React from 'react'
import { all } from 'redux-saga/effects'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import fetchMock from 'fetch-mock'
import issueFixture from 'fixtures/issue.fixture.json'
import { itemSagas as issueSagas } from 'modules/issue/redux/itemSagas'
import { mockStoreWithSaga } from 'common/testhelpers/mockStoreWithSaga'
import renderer from 'react-test-renderer'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('Issue', () => {
  afterEach(fetchMock.restore)

  it('renders correct', async () => {
    const store = mockStore({ issue: { value: null } })
    const props = await Issue.getInitialProps({
      ctx: {
        store,
        asPath: '/issue?owner=zeit&repo=next.js&number=5638'
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
    function* rootSaga() {
      yield all([...issueSagas])
    }

    const store = mockStoreWithSaga({
      initial: { issue: { value: null } },
      saga: rootSaga
    })

    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/5638', {
      status: 200,
      body: issueFixture
    })

    await Issue.getInitialProps({
      ctx: {
        store,
        asPath: '/issue?owner=zeit&repo=next.js&number=5638'
      }
    })

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions().map(el => el.type)).toEqual(['ISSUE/LOAD', 'ISSUE/LOAD_SUCCESS'])
  })

  it('works with errors', async () => {
    function* rootSaga() {
      yield all([...issueSagas])
    }

    const store = mockStoreWithSaga({
      initial: { issue: { value: null } },
      saga: rootSaga
    })

    fetchMock.get('https://api.github.com/repos/zeit/next.js/issues/5638', {
      status: 404,
      body: { error: 'no data' }
    })

    await Issue.getInitialProps({
      ctx: {
        store,
        asPath: '/issue?owner=zeit&repo=next.js&number=5638'
      }
    })

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions().map(el => el.type)).toEqual(['ISSUE/LOAD', 'ISSUE/FAILURE'])
  })
})

/* eslint-env jest */
import Index from '../index'
import { Provider } from 'react-redux'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import renderer from 'react-test-renderer'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('Index', () => {
  it('renders correct', () => {
    const initialState = {
      issueList: {
        process: {}
      }
    }
    const store = mockStore(initialState)
    const props = {
      owner: 'qwe',
      repo: 'asd'
    }
    const component = renderer.create(
      <Provider store={store}>
        <Index {...props} />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('getInitialProps works', async () => {
    const initialState = {
      issueList: { value: null }
    }

    const store = mockStore(initialState)
    const props = await Index.getInitialProps({
      ctx: {
        store,
        asPath: '/owner=zeit&repo=next.js'
      }
    })
    const component = renderer.create(
      <Provider store={store}>
        <Index {...props} />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

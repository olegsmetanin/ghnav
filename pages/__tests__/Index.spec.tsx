/* eslint-env jest */
import Index from '../index'
import { Provider } from 'react-redux'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import { history } from 'common/history'
import renderer from 'react-test-renderer'

jest.mock('common/history')

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('Index', () => {
  it('renders correct', () => {
    const initialState = {
      issueList: {
        query: {
          filter: {
            state: 'all'
          }
        },
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
      issueList: {
        query: {
          filter: {
            state: 'all'
          }
        },
        process: {}
      }
    }

    const store = mockStore(initialState)
    const props = await Index.getInitialProps({
      ctx: {
        store,
        asPath: '/owner=zeit&repo=next.js',
        isServer: false
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

  it('getInitialProps works on server', async () => {
    const props = {
      ctx: {
        store: {
          dispatch: jest.fn()
        },
        asPath: '/owner=zeit&repo=next.js',
        isServer: true
      }
    }

    await Index.getInitialProps(props)

    expect(props.ctx.store.dispatch).toBeCalled()
  })

  it('getInitialProps with come back', async () => {
    history.isComeBack = true

    const props = {
      ctx: {
        store: {
          dispatch: jest.fn()
        },
        asPath: '/owner=zeit&repo=next.js',
        isServer: false
      }
    }

    await Index.getInitialProps(props)

    expect(props.ctx.store.dispatch).toBeCalledTimes(0)
  })
})

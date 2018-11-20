/* eslint-env jest */
import Index from '../index'
import { Provider } from 'react-redux'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import { history } from 'common/history'
import { mount } from 'enzyme'
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
      },
      repoList: {}
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
      },
      repoList: {}
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

  it('works with router on repo change with autocomplete', async () => {
    const initialState = {
      issueList: {
        query: {
          filter: {
            state: 'all'
          }
        },
        process: {}
      },
      repoList: {}
    }
    const props = {
      owner: 'qwe',
      repo: 'asd'
    }

    const router = {
      push: jest.fn()
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <Index {...props} router={router} />
      </Provider>
    )

    /*
     * It is hard to call wrapper.simulate('change', { target: { value: 'xyz/cxz' } })
     * because jsdom is not suitable for Popper.js
     * For example https://github.com/FezVrasta/popper.js/issues/478
     */
    const item = tree.find('Connect(WithStyles(BaseRepoSelect))').first()
    item.props().onChange('asd/zcx')

    await new Promise(resolve => setImmediate(resolve))

    expect(router.push).toBeCalledWith({ pathname: '/', query: { owner: 'asd', repo: 'zcx' } })
  })

  it('works with router on filter change', async () => {
    const initialState = {
      issueList: {
        query: {
          filter: {
            state: 'all'
          }
        },
        process: {}
      },
      repoList: {}
    }
    const props = {
      owner: 'qwe',
      repo: 'asd'
    }

    const router = {
      push: jest.fn()
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <Index {...props} router={router} />
      </Provider>
    )

    const menu = tree.find('[role="button"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    const menuItem = tree.find('MenuItem').at(2)
    expect(menuItem.exists()).toBe(true)
    menuItem.simulate('click')

    await new Promise(resolve => setImmediate(resolve))

    expect(router.push).toBeCalledWith({
      pathname: '/',
      query: { 'filter.state': 'closed', owner: 'qwe', repo: 'asd' }
    })
  })
})

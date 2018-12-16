import * as React from 'react'

import { Index } from '../pages/index'
/* eslint-env jest */
import IndexPage from '../pages/index'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import  { historyStab } from 'common/history/__tests__/history.stab'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { routerStab } from 'common/router/__tests__/router.stab'

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
      repo: 'asd',
      filter: {
        state: 'all'
      },
      router: {
        asPath: '/?owner=zeit&repo=next.js',
      },
      history: historyStab()
    }

    const component = renderer.create(
      <Provider store={store}>
        <IndexPage {...props}/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('getInitialProps works', async () => {

    const initProps = await Index['getInitialProps']({
      ctx: {
        store: null,
        asPath: '/?owner=zeit&repo=next.js',
        isServer: false
      }
    })

    expect(initProps).toEqual({ filter: { state: 'all' }, owner: 'zeit', repo: 'next.js' })
  })

  it('getInitialProps works on server', async () => {
    const props = {
      ctx: {
        store: {
          dispatch: jest.fn()
        },
        asPath: '/?owner=zeit&repo=next.js',
        isServer: true
      }
    }

    await Index['getInitialProps'](props)

    expect(props.ctx.store.dispatch).toBeCalled()
  })

  it('getInitialProps does not dispatch if owner and repo is undefined ', async () => {
    const props = {
      ctx: {
        store: {
          dispatch: jest.fn()
        },
        asPath: '/',
        isServer: true
      }
    }

    await Index['getInitialProps'](props)

    expect(props.ctx.store.dispatch).toBeCalledTimes(0)
  })

  it('works on change repo', async () => {

    const initialState = {
      issueList: {
        query: {
          owner: 'owner',
          repo: 'repo',
          filter: {
            state: 'all'
          }
        },
        process: {}
      },
      repoList: {
        value: [
          { id: 0, owner: 'owner', repo: 'repo' }
        ]
      },
    }

    const props = {
      owner: 'owner',
      repo: 'repo',
      history: historyStab({
        push: jest.fn()
      }),
      router: routerStab({
        asPath: '/?owner=zeit&repo=next.js',
        pathname: '',
        route: '/',
      })
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <Index {...props}/>
      </Provider>
    )

    const item = tree.find('input').first()

    item.simulate('change', { target: { value: 'owner/repo' } })

    const menuItem = tree.find('MenuItem').first()

    menuItem.simulate('click')

    expect(props.history.push).toBeCalledWith({"pathname": "/", "query": {"filter": {"state": "all"}, "owner": "owner", "repo": "repo"}}, {"shallow": true})

  })

  it('works with router on filter change', async () => {

    const initialState = {
      issueList: {
        query: {
          owner: 'owner',
          repo: 'repo',
          filter: {
            state: 'all'
          }
        },
        process: {}
      },
      repoList: {}
    }


    const props = {
      owner: 'owner',
      repo: 'repo',
      history: historyStab({
        push: jest.fn()
      }),
      router: routerStab({
        asPath: '/?owner=zeit&repo=next.js',
        pathname: '',
        route: '/',
      })
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <Index {...props}/>
      </Provider>
    )

    const menu = tree.find('[role="button"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    const menuItem = tree.find('MenuItem').at(2)
    expect(menuItem.exists()).toBe(true)

    menuItem.simulate('click')

    await new Promise(resolve => setImmediate(resolve))

    expect(props.history.push).toBeCalledWith({"pathname": "/", "query": {"filter": {"state": "closed"}, "owner": "zeit", "repo": "next.js"}}, {"shallow": true})
  })

  it('works if repo and owner is undefined', async () => {

    const initialState = {
      issueList: {
        process: {}
      },
      repoList: {}
    }

    const props = {
      owner: 'owner',
      router: {
        asPath: '/',
      },
      history: historyStab({
        push: jest.fn()
      })
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <IndexPage {...props}/>
      </Provider>
    )

    expect(tree.find('WithStyles(BaseLayout)').props().title).toEqual('Github issues')
  })


})

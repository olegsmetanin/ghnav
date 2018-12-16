/* eslint-env jest */
import * as React from 'react'

import { IssueListConnected } from '../IssueListConnected'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'

describe('IssueListConnected', () => {
  it('button "Load more" is clickable', async () => {
    const initialState = {
      issueList: {
        value: [{ id: 1, number: '1', user: { login: 'asd' } }],
        query: {
          owner: 'asd',
          repo: 'qwe',
          filter: {
            state: 'all'
          },
          page: 1,
          per_page: 10
        },
        process: {}
      }
    }

    const store = configureMockStore()(initialState)

    const props = {
      owner: 'asd',
      repo: 'qwe',
      filter: {
        state: 'all'
      },
      onFilterChange: () => {
        return
      }
    }

    const tree = mount(
      <Provider store={store}>
        <IssueListConnected {...props} />
      </Provider>
    )

    const menu = tree.find('Button').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      {
        payload: {
          add: true,
          filter: { state: 'all' },
          owner: 'asd',
          page: 2,
          per_page: 10,
          repo: 'qwe'
        },
        type: 'ISSUE_LIST/LOAD'
      }
    ])
  })

  it('filter changes call router push', async () => {
    const initialState = {
      issueList: {
        value: [{ id: 1, number: '1', user: { login: 'login' } }],
        query: {
          page: 1,
          owner: 'owner',
          repo: 'repo',
          filter: { state: 'all' }
        },
        process: {}
      }
    }

    const store = configureMockStore()(initialState)

    const props = {
      owner: 'owner',
      repo: 'repo',
      filter: {
        state: 'all'
      }
    }

    const onFilterChange = jest.fn()
    const tree = mount(
      <Provider store={store}>
        <IssueListConnected {...props} onFilterChange={onFilterChange} />
      </Provider>
    )

    const menu = tree.find('[role="button"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    const menuItem = tree.find('MenuItem').at(2)
    expect(menuItem.exists()).toBe(true)
    menuItem.simulate('click')

    await new Promise(resolve => setImmediate(resolve))

    expect(onFilterChange).toBeCalledWith({ state: 'closed' })
  })
})

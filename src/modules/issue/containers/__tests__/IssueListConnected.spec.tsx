import { IssueListConnected } from '../IssueListConnected'
import { Provider } from 'react-redux'
/* eslint-env jest */
import React from 'react'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'

describe('IssueListConnected', () => {
  it('clickable', async () => {
    const initialState = { issueList: { value: [{ id: 1, number: '1' }], query: { page: 1 }, process: {} } }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <IssueListConnected />
      </Provider>
    )

    const menu = tree.find('Button').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([{ type: 'ISSUE_LIST/LOAD', payload: { page: 2, add: true } }])
  })
})

import { IssueOverviewConnected } from '../IssueOverviewConnected'
import { Provider } from 'react-redux'
/* eslint-env jest */
import React from 'react'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'

describe('IssueOverviewConnected', () => {
  it('renders', async () => {
    const initialState = {
      issue: {
        value: { id: 1, title: 'title', owner: 'owner', repo: 'repo', body: 'body', number: '1' },
        query: { page: 1 },
        process: {}
      }
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <IssueOverviewConnected />
      </Provider>
    )

    const typography = tree.find('Typography').first()
    expect(typography.exists()).toEqual(true)
    expect(typography.text()).toEqual('title')
  })
})

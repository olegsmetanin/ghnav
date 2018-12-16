/* eslint-env jest */
import * as React from 'react'

import { IssueOverviewConnected } from '../IssueOverviewConnected'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'

describe('IssueOverviewConnected', () => {
  it('renders', async () => {
    const initialState = {
      issue: {
        value: {
          id: 1,
          title: 'title',
          owner: 'owner',
          repo: 'repo',
          body: 'body',
          number: '1'
        },
        query: {
          owner: 'owner',
          repo: 'repo',
          number: '1',
          page: 1
        },
        process: {}
      }
    }

    const props = {
      owner: 'owner',
      repo: 'repo',
      number: '1'
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <IssueOverviewConnected {...props} />
      </Provider>
    )

    const typography = tree.find('Typography').first()
    expect(typography.exists()).toEqual(true)
    expect(typography.text()).toEqual('title')
  })
})

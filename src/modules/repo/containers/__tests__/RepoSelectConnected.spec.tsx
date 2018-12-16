/* eslint-env jest */
import * as React from 'react'

import { Provider } from 'react-redux'
import { RepoSelectConnected } from '../RepoSelectConnected'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'

describe('RepoSelectConnected', () => {
  it('onLoad works', async () => {
    const initialState = {
      repoList: {
        value: [{ id: 1, owner: 'owner', repo: 'repo' }],
        query: { page: 1 },
        process: {}
      }
    }

    const store = configureMockStore()(initialState)
    const value = 'qwe/asd'
    const tree = mount(
      <Provider store={store}>
        <RepoSelectConnected debounceTimeout={0} value={value} />
      </Provider>
    )

    const item = tree.find('input').first()

    item.simulate('change', { target: { value: 'owner/repo' } })

    // Wait for RepoSelect.handleOnInputChange
    await new Promise(resolve => setImmediate(resolve))
    // Wait for RepoSelect.handleOnInputDebouncedChange
    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      { payload: { search: 'owner/repo' }, type: 'REPO_LIST/LOAD' }
    ])
  })
})

import { Provider } from 'react-redux'
/* eslint-env jest */
import React from 'react'
import { RepoSelectConnected } from '../RepoSelectConnected'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'

describe('RepoSelectConnected', () => {
  it('onLoad works', async () => {
    const initialState = {
      repoList: { value: [{ id: 1, owner: 'owner', repo: 'repo' }], query: { page: 1 }, process: {} }
    }

    const store = configureMockStore()(initialState)
    const tree = mount(
      <Provider store={store}>
        <RepoSelectConnected debounceTimeout={0} />
      </Provider>
    )

    const item = tree.find('WithStyles(BaseRepoSelect)').first()
    item.props().onLoad({ search: 'asd/zcx' })

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([{ payload: { search: 'asd/zcx' }, type: 'REPO_LIST/LOAD' }])
  })
})

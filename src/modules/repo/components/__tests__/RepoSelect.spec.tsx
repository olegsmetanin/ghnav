import React from 'react'
/* eslint-env jest */
import { RepoSelect } from '../RepoSelect'
import { mount } from 'enzyme'

describe('RepoSelect', () => {
  it('calls onLoad', async () => {
    const props = {
      items: [],
      debounceTimeout: 0,
      onLoad: jest.fn(),
      onChange: jest.fn(),
      value: 'qwe/asd'
    }

    const tree = mount(<RepoSelect {...props} />)

    await new Promise(resolve => setImmediate(resolve))

    const item = tree.find('input').first()

    item.simulate('change', { target: { value: 'xyz/cxz' } })

    await new Promise(resolve => setImmediate(resolve))

    expect(props.onLoad).toBeCalledWith({ search: 'xyz/cxz' })
  })

  it('do not call onLoad if search string too short', async () => {
    const props = {
      items: [],
      debounceTimeout: 0,
      onLoad: jest.fn(),
      onChange: jest.fn(),
      value: 'qwe/asd'
    }

    const tree = mount(<RepoSelect {...props} />)

    await new Promise(resolve => setImmediate(resolve))

    const item = tree.find('input').first()

    item.simulate('change', { target: { value: 'xy' } })

    await new Promise(resolve => setImmediate(resolve))

    expect(props.onLoad).toBeCalledTimes(0)
  })

  it('do not call onLoad if search string equals current value', async () => {
    const props = {
      items: [],
      debounceTimeout: 0,
      onLoad: jest.fn(),
      onChange: jest.fn(),
      value: 'qwe/asd'
    }

    const tree = mount(<RepoSelect {...props} />)

    await new Promise(resolve => setImmediate(resolve))

    const item = tree.find('input').first()

    item.simulate('change', { target: { value: 'qwe/asd' } })

    await new Promise(resolve => setImmediate(resolve))

    expect(props.onLoad).toBeCalledTimes(0)

    // await new Promise(resolve => setImmediate(resolve))
  })

  it('calls onChange', async () => {
    const props = {
      items: [{ id: 0, owner: 'owner', repo: 'repo' }],
      debounceTimeout: 0,
      onLoad: jest.fn(),
      onChange: jest.fn(),
      value: 'qwe/asd'
    }

    const tree = mount(<RepoSelect {...props} />)

    const item = tree.find('input').first()

    item.simulate('change', { target: { value: 'owner/repo' } })

    const menuItem = tree.find('MenuItem').first()

    menuItem.simulate('click')

    expect(props.onChange).toBeCalledWith('owner/repo')
  })
})

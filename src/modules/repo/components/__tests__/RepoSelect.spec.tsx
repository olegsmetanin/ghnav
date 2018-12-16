import * as React from 'react'

/* eslint-env jest */
import { RepoSelect } from '../RepoSelect'
import { mount } from 'enzyme'

describe('RepoSelect', () => {
  it('calls onChange', async () => {
    const props = {
      items: [{ id: '0', owner: 'owner', repo: 'repo' }],
      debounceTimeout: 0,
      onInputChange: jest.fn(),
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

  it('calls setState on props change', async () => {
    const props = {
      debounceTimeout: 0,
      value: 'qwe/asd',
      onInputChange: () => {
        return
      }
    }

    const tree = mount(<RepoSelect {...props} />)

    const select = tree.find('BaseRepoSelect').first()

    expect(select.state()).toEqual({ value: 'qwe/asd' })

    const newProps = {
      value: 'owner/repo'
    }

    await tree.setProps(newProps)

    expect(select.state()).toEqual({ value: 'owner/repo' })
  })

  it('restores input value on blur', async () => {
    const props = {
      items: [{ id: '0', owner: 'qwe', repo: 'asd' }],
      debounceTimeout: 0,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
      value: 'owner/repo'
    }

    const tree = mount(<RepoSelect {...props} />)

    const input = tree.find('input').first()

    input.simulate('focus')
    input.simulate('change', { target: { value: 'qwe/asd' } })

    await new Promise(resolve => setImmediate(resolve))

    const menuItem = tree.find('MenuItem').first()

    expect(menuItem.exists()).toBe(true)

    input.simulate('blur')

    await new Promise(resolve => setImmediate(resolve))

    const select = tree.find('BaseRepoSelect').first()
    expect(select.state()).toEqual({ value: 'owner/repo' })
  })
})

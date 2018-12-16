import * as React from 'react'

/* eslint-env jest */
import { IssueListMenu } from '../IssueListMenu'
import { mount } from 'enzyme'

describe('IssueListMenu', () => {
  it('clickable', async () => {
    const value = { state: 'all' }

    const onChange = jest.fn()

    const tree = mount(<IssueListMenu value={value} onChange={onChange} />)
    const menu = tree.find('[role="button"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    const menuItem = tree.find('MenuItem').at(2)
    expect(menuItem.exists()).toBe(true)
    menuItem.simulate('click')

    expect(onChange).toBeCalledWith({ state: 'closed' })
  })
})

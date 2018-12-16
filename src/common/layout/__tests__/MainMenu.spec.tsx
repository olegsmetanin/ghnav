import * as React from 'react'

/* eslint-env jest */
import { MainMenu } from '../MainMenu'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

describe('MainMenu', () => {
  it('renders menus', () => {
    const tree = mount(<MainMenu>Hello</MainMenu>)
    const menu = tree.find('[data-test-id="mobile-menu-icon"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')
    const profile = tree.find('[data-test-id="menu-profile-item"]').first()
    expect(profile.exists()).toBe(true)
    profile.simulate('click')
    const subprofile = tree
      .find('[data-test-id="menu-profile-profile-item"]')
      .first()
    expect(subprofile.exists()).toBe(true)
    subprofile.simulate('click')
  })

  it('renders with different width', () => {
    const component = renderer.create(<MainMenu>Hello</MainMenu>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

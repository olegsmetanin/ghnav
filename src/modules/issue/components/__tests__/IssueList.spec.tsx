/* eslint-env jest */
import { IssueList } from '../IssueList'
import React from 'react'
import { cloneDeep } from 'lodash'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

describe('IssueList', () => {
  const stubProps = {
    owner: 'owner',
    repo: 'repo',
    number: '1',
    page: 1,
    per_page: 10,
    items: [
      {
        id: '12',
        number: '12',
        // markdown
        body: 'I have iPhone 5s, 6, 7, 8, XS',
        title: 'title',
        create_at: 'create_at'
      }
    ],
    query: {
      owner: 'owner',
      repo: 'repo',
      number: 'number',
      page: 1,
      per_page: 10,
      filter: {
        state: 'all'
      }
    },
    process: {},
    onLoad: () => {
      return
    },
    onFilterChange: () => {
      return
    }
  }

  it('renders correct', async () => {
    const props = cloneDeep(stubProps)
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders button in loading state', async () => {
    const props = cloneDeep(stubProps)
    props.process.isLoading = true
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('scrolls on top on filter change', async () => {
    const props = cloneDeep(stubProps)

    const scrollTo = jest.fn()
    global.scrollTo = scrollTo

    const tree = mount(<IssueList {...props} />)

    const newProps = {
      query: {
        ...props.query,
        filter: {
          state: 'all'
        }
      }
    }

    await tree.setProps(newProps)

    const nextProps = {
      query: {
        ...props.query,
        filter: {
          state: 'open'
        }
      }
    }

    await tree.setProps(nextProps)

    expect(scrollTo).toBeCalledWith(0, 0)
  })

  it('calls onFilterChange', async () => {
    const props = cloneDeep(stubProps)

    let filter

    props.onFilterChange = jest.fn(x => (filter = x))

    const tree = mount(<IssueList {...props} />)

    const menu = tree.find('[role="button"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    const menuItem = tree.find('MenuItem').at(2)
    expect(menuItem.exists()).toBe(true)
    menuItem.simulate('click')

    expect(props.onFilterChange).toBeCalledWith({ state: 'closed' })
    expect(filter).toEqual({ state: 'closed' })
  })

  it('calls onFilterChange', async () => {
    const props = cloneDeep(stubProps)

    delete props.onFilterChange

    const tree = mount(<IssueList {...props} />)

    const menu = tree.find('[role="button"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    const menuItem = tree.find('MenuItem').at(2)
    expect(menuItem.exists()).toBe(true)
    menuItem.simulate('click')

    // expect(props.onFilterChange).toBeCalledTimes(0)
  })
})

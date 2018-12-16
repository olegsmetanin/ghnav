import * as React from 'react'

/* eslint-env jest */
import { IssueList } from '../IssueList'
import { RepoNotDefinedError } from 'common/errors'
import { cloneDeep } from 'lodash'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

describe('IssueList', () => {
  const stubProps = {
    owner: 'owner',
    repo: 'repo',
    filter: {
      state: 'all'
    },
    page: 1,
    per_page: 10,
    items: [
      {
        id: '12',
        number: '12',
        // markdown
        body: 'I have iPhone 5s, 6, 7, 8, XS',
        title: 'title',
        user: {
          login: 'qwe'
        },
        created_at: '2018-12-12'
      }
    ],
    query: {
      owner: 'owner',
      repo: 'repo',
      page: 1,
      per_page: 10,
      filter: {
        state: 'all'
      }
    },
    error: null,
    process: {
      isLoading: false,
      isLoadingMore: false
    },
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

  it('renders isLoadingMore state', async () => {
    const props = cloneDeep(stubProps)
    props.process.isLoadingMore = true
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders if the items property is empty', async () => {
    const props = cloneDeep(stubProps)
    props.items = []
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders if repo is not defined', async () => {
    const props = cloneDeep(stubProps)
    props.error = new RepoNotDefinedError('No repo is defined')
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders on error', async () => {
    const props = cloneDeep(stubProps)
    props.error = new Error('Some error')
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('scrolls on top on filter change', async () => {
    const props = cloneDeep(stubProps)

    const scrollTo = jest.fn()
    const SCROLL_TO = 'scrollTo'
    global[SCROLL_TO] = scrollTo

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

  it('calls onLoad if invalidation is required', async () => {
    const props = cloneDeep(stubProps)

    props.onLoad = jest.fn()

    const tree = mount(<IssueList {...props} />)

    const newProps = {
      query: {
        ...props.query,
        filter: {
          state: 'all'
        }
      },
      owner: 'asd'
    }

    await tree.setProps(newProps)

    expect(props.onLoad).toBeCalledWith({
      filter: { state: 'all' },
      owner: 'asd',
      page: 1,
      per_page: 10,
      repo: 'repo'
    })
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

  it('do not call onFilterChange if it is undefined', async () => {
    const props = cloneDeep(stubProps)

    delete props.onFilterChange

    const tree = mount(<IssueList {...props} />)

    const menu = tree.find('[role="button"]').first()
    expect(menu.exists()).toBe(true)
    menu.simulate('click')

    const menuItem = tree.find('MenuItem').at(2)
    expect(menuItem.exists()).toBe(true)
    menuItem.simulate('click')
  })
})

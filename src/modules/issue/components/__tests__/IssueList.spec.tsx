/* eslint-env jest */
import { IssueList } from '../IssueList'
import React from 'react'
import renderer from 'react-test-renderer'

describe('IssueList', () => {
  it('renders correct', async () => {
    const props = {
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
      }
    }
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders button in progress', async () => {
    const props = {
      owner: 'owner',
      repo: 'repo',
      number: 'number',
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
      process: {
        isLoading: true
      },
      onLoad: () => {
        return
      }
    }
    const component = renderer.create(<IssueList {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

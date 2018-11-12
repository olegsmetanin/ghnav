/* eslint-env jest */
import { IssueOverview } from '../IssueOverview'
import React from 'react'
import renderer from 'react-test-renderer'

describe('IssueOverview', () => {
  it('renders correct', async () => {
    const props = {
      owner: 'owner',
      repo: 'repo',
      num: 'num',
      value: {
        // markdown
        body: 'I have iPhone 5s, 6, 7, 8, XS',
        title: 'title',
        create_at: 'create_at'
      },
      query: {
        owner: 'owner',
        repo: 'repo',
        num: 'num'
      }
    }
    const component = renderer.create(<IssueOverview {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

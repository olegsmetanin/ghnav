/* eslint-env jest */
import { IssueListItem } from '../IssueListItem'
import React from 'react'
import renderer from 'react-test-renderer'

describe('IssueListItem', () => {
  it('renders correct', async () => {
    const props = {
      value: {
        title: 'title',
        owner: 'owner',
        repo: 'repo',
        number: '123',
        create_at: '2018-11-17'
      }
    }
    const component = renderer.create(<IssueListItem {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

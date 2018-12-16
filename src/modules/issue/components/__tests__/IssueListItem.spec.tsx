import * as React from 'react'

/* eslint-env jest */
import { IssueListItem } from '../IssueListItem'
import renderer from 'react-test-renderer'

describe('IssueListItem', () => {
  it('renders correct', async () => {
    const props = {
      owner: 'owner',
      repo: 'repo',
      value: {
        id: 'id',
        title: 'title',
        number: '123',
        created_at: '2018-11-17',
        user: {
          login: 'login'
        },
        body: 'body'
      }
    }
    const component = renderer.create(<IssueListItem {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

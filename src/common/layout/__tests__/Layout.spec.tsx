import * as React from 'react'

/* eslint-env jest */
import { Layout } from '../Layout'
import renderer from 'react-test-renderer'

jest.mock('next/head', () => props => <div>{props.children}</div>)

describe('Layout', () => {
  it('renders correct', () => {
    const component = renderer.create(<Layout />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correct with title', () => {
    const component = renderer.create(<Layout title="Homepage">Content</Layout>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
